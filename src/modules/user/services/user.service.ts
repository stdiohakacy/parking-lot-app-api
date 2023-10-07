import { ConflictException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/core/auth/services/auth.service';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { instanceToPlain } from 'class-transformer';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private readonly authService: AuthService
    ) {}

    async getByUsername(username: string) {
        return await this.userRepo.findOne({ where: { username } });
    }

    async register(payload: UserRegisterDTO) {
        const { username, password } = payload;

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

        const user = new UserEntity().register({
            ...payload,
            password: passwordAuth,
            type: ENUM_USER_TYPE.PARKING_AGENT,
        });

        const userCreated = await this.userRepo.save(user);
        return instanceToPlain(userCreated);
    }
}
