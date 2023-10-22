import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingSpotCreateDTO } from '../dtos/parking-spot.create.dto';
import { ParkingSpotService } from '../services/parking-spot.service';
import {
    ParkingSpotPublicCreateDoc,
    ParkingSpotPublicParkVehicleDoc,
} from '../docs/parking-spot.public.doc';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from 'src/modules/parking-lot/constants/parking-lot.status-code.constant';
import { ParkingSpotParkingVehicleDTO } from '../dtos/parking-spot.park-vehicle.dto';

@ApiTags('modules.public.parking-spot')
@Controller({ version: '1', path: '/parking-spots' })
export class ParkingSpotPublicController {
    constructor(private readonly parkingSpotService: ParkingSpotService) {}

    @ParkingSpotPublicCreateDoc()
    @Response('parkingSpot.create')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async create(@Body() dto: ParkingSpotCreateDTO) {
        return await this.parkingSpotService.create(dto);
    }

    @ParkingSpotPublicParkVehicleDoc()
    @Response('parkingSpot.parkVehicle')
    @HttpCode(HttpStatus.OK)
    @Post('/park-vehicle')
    async parkVehicle(@Body() dto: ParkingSpotParkingVehicleDTO) {
        return await this.parkingSpotService.parkVehicle(dto);
    }
}
