import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    TestDoc,
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

    @UserPublicLoginDoc()
    @Response('user.login', { serialization: UserLoginSerialization })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() payload: UserLoginDTO) {
        return await this.userService.login(payload);
    }

    @TestDoc()
    @Post('/test')
    async test() {
        return await this.userService.test({
            username: 'duynguyen',
            activationLink:
                'https://www.youtube.com/watch?v=t7tZFq29lis&list=RD0HZ9UO7pLfo&index=28',
        });
    }
}
