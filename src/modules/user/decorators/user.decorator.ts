import {
    ExecutionContext,
    UseGuards,
    applyDecorators,
    createParamDecorator,
} from '@nestjs/common';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserEntity } from '../entities/user.entity';
import { IRequestApp } from 'src/core/request/interfaces/request.interface';

export function UserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard)
    );
}

export const GetUser = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): UserEntity => {
        const { __user } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserEntity }>();
        return returnPlain ? __user : __user;
    }
);
