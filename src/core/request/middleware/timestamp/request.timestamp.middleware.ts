import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { HelperDateService } from '../../../../core/helper/services/helper.date.service';
import { HelperNumberService } from '../../../../core/helper/services/helper.number.service';
import { IRequestApp } from '../../../../core/request/interfaces/request.interface';

@Injectable()
export class RequestTimestampMiddleware implements NestMiddleware {
    constructor(
        private readonly helperNumberService: HelperNumberService,
        private readonly helperDateService: HelperDateService
    ) {}

    async use(
        req: IRequestApp,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        req.__xTimestamp = req['x-timestamp']
            ? this.helperNumberService.create(req['x-timestamp'])
            : undefined;
        req.__timestamp = this.helperDateService.timestamp();
        next();
    }
}
