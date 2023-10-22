import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingSpotService } from '../services/parking-spot.service';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingSpotPublicParkVehicleDoc } from '../docs/parking-spot.public.doc';
import { ParkingSpotParkVehicleDTO } from '../dtos/parking-spot.park-vehicle.dto';

@ApiTags('modules.public.parking-spot')
@Controller({ version: '1', path: '/parkingSpots' })
export class ParkingSpotPublicController {
    constructor(private readonly parkingSpotService: ParkingSpotService) {}

    @ParkingSpotPublicParkVehicleDoc()
    @Response('parkingSpot.parkVehicle')
    @Post('/:id/park-vehicle')
    async parkVehicle(
        @Param('id') id: string,
        @Body() dto: ParkingSpotParkVehicleDTO
    ) {
        return await this.parkingSpotService.parkVehicle(id, dto);
    }
}
