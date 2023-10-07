import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppHelloApiKeyDoc, AppHelloDoc } from 'src/app/docs/app.doc';
import { AppHelloSerialization } from 'src/app/serializations/app.hello.serialization';
import { ApiKeyPublicProtected } from 'src/core/api-key/decorators/api-key.decorator';
import { HelperDateService } from 'src/core/helper/services/helper.date.service';
import { RequestUserAgent } from 'src/core/request/decorators/request.decorator';
import { Response } from 'src/core/response/decorators/response.decorator';
import { IResponse } from 'src/core/response/interfaces/response.interface';
import { IResult } from 'ua-parser-js';

@ApiTags('hello')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/',
})
export class AppController {
    private readonly serviceName: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService
    ) {
        this.serviceName = this.configService.get<string>('app.name');
    }

    @AppHelloDoc()
    @Response('app.hello', { serialization: AppHelloSerialization })
    @Get('/hello')
    async hello(@RequestUserAgent() userAgent: IResult): Promise<IResponse> {
        const newDate = this.helperDateService.create();

        return {
            _metadata: {
                customProperty: {
                    messageProperties: {
                        serviceName: this.serviceName,
                    },
                },
            },
            data: {
                userAgent,
                date: newDate,
                format: this.helperDateService.format(newDate),
                timestamp: this.helperDateService.timestamp(newDate),
            },
        };
    }

    @AppHelloApiKeyDoc()
    @Response('app.hello', { serialization: AppHelloSerialization })
    @ApiKeyPublicProtected()
    @Get('/hello/api-key')
    async helloApiKey(
        @RequestUserAgent() userAgent: IResult
    ): Promise<IResponse> {
        const newDate = this.helperDateService.create();

        return {
            _metadata: {
                customProperty: {
                    messageProperties: {
                        serviceName: this.serviceName,
                    },
                },
            },
            data: {
                userAgent,
                date: newDate,
                format: this.helperDateService.format(newDate),
                timestamp: this.helperDateService.timestamp(newDate),
            },
        };
    }
}
