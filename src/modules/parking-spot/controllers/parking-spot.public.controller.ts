import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingSpotCreateDTO } from '../dtos/parking-spot.create.dto';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ParkingSpotPublicCreateDoc } from '../docs/parking-spot.public.doc';

@ApiTags('modules.public.parking-spot')
@Controller({ version: '1', path: '/parking-spots' })
export class ParkingSpotPublicController {
    constructor(private readonly parkingSpotService: ParkingSpotService) {}

    @ParkingSpotPublicCreateDoc()
    @Response('parkingSpot.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() payload: ParkingSpotCreateDTO) {
        return await this.parkingSpotService.create(payload);
    }
}
