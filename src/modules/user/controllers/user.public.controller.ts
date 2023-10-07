import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
    UserPublicLoginDoc,
    UserPublicRegisterDoc,
} from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserRegisterCommand } from '../commands/user.register.command';
import { Response } from 'src/core/response/decorators/response.decorator';
import { UserLoginSerialization } from '../serializations/user.login.serialization';
import { UserLoginDTO } from '../dtos/user.login.dto';
import { UserLoginCommand } from '../commands/user.login.command';

@ApiTags('modules.public.user')
@Controller({ version: '1', path: '/user' })
export class UserPublicController {
    constructor(private readonly commandBus: CommandBus) {}

    @UserPublicRegisterDoc()
    @Response('user.register')
    @Post('/register')
    async register(@Body() payload: UserRegisterDTO) {
        return await this.commandBus.execute(new UserRegisterCommand(payload));
    }

    @UserPublicLoginDoc()
    @Response('user.login', { serialization: UserLoginSerialization })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() payload: UserLoginDTO) {
        return await this.commandBus.execute(new UserLoginCommand(payload));
    }
}
