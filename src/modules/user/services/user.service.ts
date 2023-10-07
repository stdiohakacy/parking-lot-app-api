import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from 'src/core/auth/services/auth.service';
import { UserRegisterCommand } from '../commands/user.register.command';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepo: UserRepository,
        public readonly authService: AuthService
    ) {}

    async register({ payload }: UserRegisterCommand) {
        const { username, password } = payload;
        const usernameExist = await this.userRepo.findOneByUsername(username);

        if (usernameExist) {
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

        const userCreated = await this.userRepo.create(user);
        return instanceToPlain(userCreated);
    }
}
