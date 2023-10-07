import { InsertResult } from 'typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserLoginDTO } from '../dtos/user.login.dto';
import { UserRepository } from '../repositories/user.repository';
import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import { instanceToPlain } from 'class-transformer';
import { AuthService } from 'src/core/auth/services/auth.service';

export class UserLoginCommand implements ICommand {
    constructor(public readonly payload: UserLoginDTO) {}
}

@CommandHandler(UserLoginCommand)
export class UserLoginHandler implements ICommandHandler<UserLoginCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly authService: AuthService
    ) {}

    async execute({ payload }: UserLoginCommand) {
        const { username, password } = payload;
        const user = await this.userRepo.findOneByUsername(username);
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        console.log(password);
        console.log(user.password);

        const isValid = await this.authService.validateUser(
            password,
            user.password.passwordHash
        );

        if (!isValid) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        } else if (user.status !== ENUM_USER_STATUS.ACTIVE) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        }

        const userPayload = user.payloadSerialization();
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(userPayload);
        const payloadRefreshToken: Record<string, any> =
            await this.authService.createPayloadRefreshToken(userPayload._id);
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

        const accessToken = await this.authService.createAccessToken(
            payloadHashedAccessToken
        );

        const refreshToken = await this.authService.createRefreshToken(
            payloadHashedRefreshToken
        );

        return instanceToPlain({
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        });
    }
}
