import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { API_KEY_TYPE_META_KEY } from 'src/core/api-key/constants/api-key.constant';
import { ENUM_API_KEY_TYPE } from 'src/core/api-key/constants/api-key.enum.constant';
import { ApiKeyPayloadTypeGuard } from 'src/core/api-key/guards/payload/api-key.payload.type.guard';
import { ApiKeyXApiKeyGuard } from 'src/core/api-key/guards/x-api-key/api-key.x-api-key.guard';
import { IApiKeyPayload } from 'src/core/api-key/interfaces/api-key.interface';

import { IRequestApp } from 'src/core/request/interfaces/request.interface';
import { ApiKeyEntity } from 'src/modules/api-key/entities/api-key.entity';

export const ApiKeyPayload: () => ParameterDecorator = createParamDecorator(
    (data: string, ctx: ExecutionContext): IApiKeyPayload => {
        const { apiKey } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { apiKey: IApiKeyPayload }>();
        return data ? apiKey[data] : apiKey;
    }
);

export function ApiKeyServiceProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard),
        SetMetadata(API_KEY_TYPE_META_KEY, [ENUM_API_KEY_TYPE.SERVICE])
    );
}

export function ApiKeyPublicProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard),
        SetMetadata(API_KEY_TYPE_META_KEY, [ENUM_API_KEY_TYPE.PUBLIC])
    );
}

export const GetApiKey = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): ApiKeyEntity => {
        const { __apiKey } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __apiKey: ApiKeyEntity | any }>();
        return returnPlain ? __apiKey.toObject() : __apiKey;
    }
);
