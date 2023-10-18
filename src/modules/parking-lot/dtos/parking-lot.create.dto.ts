import { PickType } from '@nestjs/swagger';
import { ParkingLotDTO } from './parking-lot.dto';

export class ParkingLotCreateDTO extends PickType(ParkingLotDTO, [
    'name',
    'address',
]) {}
