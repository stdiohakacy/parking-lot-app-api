import { PickType } from '@nestjs/swagger';
import { ParkingRateDTO } from './parking-rate.dto';

export class ParkingRateCreateDTO extends PickType(ParkingRateDTO, [
    'hours',
    'rate',
    'parkingLotId',
]) {}
