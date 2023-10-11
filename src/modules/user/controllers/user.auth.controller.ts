import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserAuthProfileDoc } from '../docs/user.auth.doc';
import { Response } from 'src/core/response/decorators/response.decorator';
import { UserChangePasswordDTO } from '../dtos/user.change-password.dto';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { GetUser, UserProtected } from '../decorators/user.decorator';
import { AuthJwtAccessProtected } from 'src/core/auth/decorators/auth.jwt.decorator';
import { UserEntity } from '../entities/user.entity';
import { IResponse } from 'src/core/response/interfaces/response.interface';

@ApiTags('modules.auth.user')
@Controller({ version: '1', path: '/user' })
export class UserAuthController {
    constructor() {}

    @UserAuthProfileDoc()
    @Response('user.profile', { serialization: UserProfileSerialization })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/profile')
    async profile(@GetUser() user: UserEntity): Promise<IResponse> {
        return { data: user };
    }
}
