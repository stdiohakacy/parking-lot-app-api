import { ApiProperty, PickType } from '@nestjs/swagger';
import { ParkingSpotDTO } from './parking-spot.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParkingSpotCreateDTO extends PickType(ParkingSpotDTO, [
    'isFree',
    'parkingLotId',
    'parkingSpotType',
]) {}
