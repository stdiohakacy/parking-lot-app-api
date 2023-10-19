import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ExitService } from '../services/exit.service';
import { ExitCreateDTO } from '../dtos/exit.create.dto';
import { ExitPublicCreateDoc } from '../docs/exit.public.doc';

@ApiTags('modules.public.exit')
@Controller({ version: '1', path: '/exits' })
export class ExitPublicController {
    constructor(private readonly exitService: ExitService) {}

    @ExitPublicCreateDoc()
    @Response('exit.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() payload: ExitCreateDTO) {
        return await this.exitService.create(payload);
    }
}
