import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';
import { EntrancePublicCreateDoc } from '../docs/entrance.public.doc';
import { EntranceService } from '../services/entrance.service';

@ApiTags('modules.public.entrance')
@Controller({ version: '1', path: '/entrances' })
export class EntrancePublicController {
    constructor(private readonly entranceService: EntranceService) {}

    @EntrancePublicCreateDoc()
    @Response('entrance.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() payload: EntranceCreateDTO) {
        return await this.entranceService.create(payload);
    }
}
