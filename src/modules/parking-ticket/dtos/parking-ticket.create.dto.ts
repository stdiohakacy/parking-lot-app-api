import { PickType } from '@nestjs/swagger';
import { ParkingTicketDTO } from './parking-ticket.dto';

export class ParkingTicketCreateDTO extends PickType(ParkingTicketDTO, [
    'parkingLotId',
    'licenseNo',
]) {}
