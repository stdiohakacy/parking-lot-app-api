import { PickType } from '@nestjs/swagger';
import { EntranceDTO } from './entrance.dto';

export class EntranceCreateDTO extends PickType(EntranceDTO, [
    'name',
    'parkingLotId',
]) {}
