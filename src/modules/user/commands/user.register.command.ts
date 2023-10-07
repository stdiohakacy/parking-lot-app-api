import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserRepository } from '../repositories/user.repository';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { AuthService } from 'src/core/auth/services/auth.service';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { instanceToPlain } from 'class-transformer';
import { UserService } from '../services/user.service';

export class UserRegisterCommand implements ICommand {
    constructor(public readonly payload: UserRegisterDTO) {}
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
    implements ICommandHandler<UserRegisterCommand>
{
    constructor(private readonly userService: UserService) {}
    async execute({ payload }: UserRegisterCommand) {
        return await this.userService.register({ payload });
    }
}
