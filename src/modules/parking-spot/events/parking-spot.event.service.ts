import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENUM_PARKING_SPOT_EVENT } from '../constants/parking-spot.enum.constant';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';
import { ParkingSpotParkVehicleDTO } from '../dtos/parking-spot.park-vehicle.dto';

@Injectable()
export class ParkingSpotEventService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    async parkingSpotPark(id: string, dto: ParkingSpotParkVehicleDTO) {
        await this.eventEmitter.emit(
            ENUM_PARKING_SPOT_EVENT.PARKING_SPOT_UPDATED,
            id,
            dto
        );
    }
}
