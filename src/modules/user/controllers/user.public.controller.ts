import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
    UserPublicLoginDoc,
    UserPublicRegisterDoc,
} from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { Response } from 'src/core/response/decorators/response.decorator';
import { UserLoginSerialization } from '../serializations/user.login.serialization';
import { UserLoginDTO } from '../dtos/user.login.dto';
import { UserService } from '../services/user.service';

@ApiTags('modules.public.user')
@Controller({ version: '1', path: '/user' })
export class UserPublicController {
    constructor(private readonly userService: UserService) {}

    @UserPublicRegisterDoc()
    @Response('user.register')
    @Post('/register')
    async register(@Body() payload: UserRegisterDTO) {
        return await this.userService.register(payload);
    }
}
