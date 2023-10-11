import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/core/auth/services/auth.service';
import {
    ENUM_USER_STATUS_CODE_ERROR,
    ENUM_USER_STATUS_CODE_SUCCESS,
} from '../constants/user.status-code.constant';
import { UserEntity } from '../entities/user.entity';
import {
    ENUM_USER_STATUS,
    ENUM_USER_TYPE,
} from '../constants/user.enum.constant';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDTO } from '../dtos/user.login.dto';
import { ENUM_AUTH_LOGIN_WITH } from 'src/core/auth/constants/auth.enum.constant';
import { randomBytes } from 'crypto';
import { HelperDateService } from 'src/core/helper/services/helper.date.service';
import { IMailParamsAccountActivation } from 'src/modules/email/interfaces/email.interface';
import {
    ENUM_MAIL_SUBJECT,
    ENUM_MAIL_TEMPLATE_KEY,
} from 'src/modules/email/constants/email.enum.constant';
import { EmailProviderFactory } from 'src/modules/email/providers/email.provider.factory';
import { ConfigService } from '@nestjs/config';
import { UserActiveDTO } from '../dtos/user.active.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private readonly authService: AuthService,
        private readonly helperDateService: HelperDateService,
        private readonly emailProviderFactory: EmailProviderFactory,
        private readonly configService: ConfigService
    ) {}

    async getById(id: string) {
        return await this.userRepo.findOne({ where: { id } });
    }

    async active(payload: UserActiveDTO) {
        const { username, activeKey } = payload;
        const user = await this.userRepo.findOne({ where: { username } });

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        if (user.activeKey !== activeKey) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_ACTIVE_KEY_INVALID_ERROR,
                message: 'user.error.activeKey.invalid',
            });
        }

        if (user.activeExpire < this.helperDateService.create()) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_ACTIVE_KEY_EXPIRED_ERROR,
                message: 'user.error.activeKey.expired',
            });
        }

        await this.userRepo.save(user.active());
    }

    async getByUsername(username: string) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        return user;
    }

    async register(payload: UserRegisterDTO): Promise<UserEntity> {
        const { username, password, email } = payload;

        const isUsernameExist = await this.userRepo.findOne({
            where: { username },
        });

        if (isUsernameExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_USERNAME_EXISTS_ERROR,
                message: 'user.error.usernameExist',
            });
        }
        const passwordAuth = await this.authService.createPassword(password);

        const activeKey = randomBytes(32).toString('hex');
        const activeExpire = this.helperDateService.forwardInSeconds(
            3 * 24 * 60 * 60,
            { fromDate: new Date() }
        );

        const emailProvider = this.emailProviderFactory.initProvider();

        const htmlContent: string =
            emailProvider.getContentEmail<IMailParamsAccountActivation>(
                ENUM_MAIL_TEMPLATE_KEY.ACCOUNT_ACTIVATION,
                {
                    username,
                    activationLink: `http://${this.configService.get<string>(
                        'app.http.host'
                    )}:${this.configService.get<string>(
                        'app.http.port'
                    )}/confirm-account?username=${username}&key=${activeKey}`,
                }
            );

        emailProvider.send(
            [email],
            ENUM_MAIL_SUBJECT.ACCOUNT_ACTIVATION,
            htmlContent
        );

        const user = new UserEntity().register({
            ...payload,
            activeKey,
            activeExpire,
            password: passwordAuth,
        });
        return await this.userRepo.save(user);
        // return user;
    }

    async login(payload: UserLoginDTO) {
        const { username, password } = payload;
        const user = await this.getByUsername(username);

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const validate: boolean = await this.authService.validateUser(
            password,
            user.password.passwordHash
        );

        if (!validate) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        }

        if (user.status !== ENUM_USER_STATUS.ACTIVE) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        }

        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(user);
        const payloadRefreshToken: Record<string, any> =
            await this.authService.createPayloadRefreshToken(user.id, {
                loginWith: ENUM_AUTH_LOGIN_WITH.LOCAL,
            });

        const payloadEncryption = await this.authService.getPayloadEncryption();
        let payloadHashedAccessToken: Record<string, any> | string =
            payloadAccessToken;
        let payloadHashedRefreshToken: Record<string, any> | string =
            payloadRefreshToken;

        if (payloadEncryption) {
            payloadHashedAccessToken =
                await this.authService.encryptAccessToken(payloadAccessToken);
            payloadHashedRefreshToken =
                await this.authService.encryptRefreshToken(payloadRefreshToken);
        }

        const accessToken: string = await this.authService.createAccessToken(
            payloadHashedAccessToken
        );

        const refreshToken: string = await this.authService.createRefreshToken(
            payloadHashedRefreshToken
        );

        const checkPasswordExpired: boolean =
            await this.authService.checkPasswordExpired(
                user.password.passwordExpired
            );

        if (checkPasswordExpired) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_USER_STATUS_CODE_SUCCESS.USER_PASSWORD_EXPIRED_ERROR,
                message: 'user.error.passwordExpired',
            });
        }

        return {
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        };
    }
}
