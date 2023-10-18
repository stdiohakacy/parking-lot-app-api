import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingLotService } from '../services/parking-lot.service';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';
import { ParkingLotPublicCreateDoc } from '../docs/parking-lot.public.doc';

@ApiTags('modules.public.parking-lot')
@Controller({ version: '1', path: '/parking-lots' })
export class ParkingLotPublicController {
    constructor(private readonly parkingLotService: ParkingLotService) {}

    @ParkingLotPublicCreateDoc()
    @Response('parkingLot.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() payload: ParkingLotCreateDTO) {
        return await this.parkingLotService.create(payload);
    }
}
