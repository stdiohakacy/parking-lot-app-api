import { PickType } from '@nestjs/swagger';
import { ParkingSpotDTO } from './parking-spot.dto';

export class ParkingSpotCreateDTO extends PickType(ParkingSpotDTO, [
    'isFree',
    'parkingLotId',
]) {}
