import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingTicketService } from '../parking-ticket.service';
import { Response } from 'src/core/response/decorators/response.decorator';
import { ParkingTicketPublicTakeTicketDoc } from '../docs/parking-ticket.public.doc';

@ApiTags('modules.public.parking-ticket')
@Controller({ version: '1', path: '/parking-tickets' })
export class ParkingTicketPublicController {
    constructor(private readonly parkingTicketService: ParkingTicketService) {}

    @ParkingTicketPublicTakeTicketDoc()
    @Response('parkingTicket.takeTicket')
    @Post('/take-ticket')
    async takeTicket() {
        return await this.parkingTicketService.takeTicket();
    }
}
