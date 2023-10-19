import { PickType } from '@nestjs/swagger';
import { ExitDTO } from './exit.dto';

export class ExitCreateDTO extends PickType(ExitDTO, [
    'name',
    'parkingLotId',
]) {}
