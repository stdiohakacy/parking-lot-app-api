import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingRateService } from '../services/parking-rate.service';
import { ParkingRateCreateDTO } from '../dtos/parking-rate.create.dto';
import { ParkingRatePublicCreateDoc } from '../docs/parking-rate.public.doc';

@ApiTags('modules.public.parking-rate')
@Controller({ version: '1', path: '/parking-rates' })
export class ParkingRatePublicController {
    constructor(private readonly parkingRateService: ParkingRateService) {}

    @ParkingRatePublicCreateDoc()
    @Response('parkingRate.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() payload: ParkingRateCreateDTO) {
        return await this.parkingRateService.create(payload);
    }
}
