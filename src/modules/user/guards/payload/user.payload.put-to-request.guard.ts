import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/core/request/interfaces/request.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserEntity }>();
        const { user } = request;

        const check = await this.userService.getById(user.__id);
        request.__user = check;

        return true;
    }
}
