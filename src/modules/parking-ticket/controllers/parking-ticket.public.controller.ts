import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingTicketService } from '../parking-ticket.service';
import { Response } from 'src/core/response/decorators/response.decorator';
import {
    ParkingTicketPublicScanTicketDoc,
    ParkingTicketPublicTakeTicketDoc,
} from '../docs/parking-ticket.public.doc';
import { ParkingTicketScanTicketSerialization } from '../serializations/parking-ticket.scan-ticket.serialization';

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

    @ParkingTicketPublicScanTicketDoc()
    @Get('/:id/scan-ticket')
    @Response('parkingTicket.scanTicket', {
        serialization: ParkingTicketScanTicketSerialization,
    })
    async scanTicket(@Param('id') id: string) {
        return await this.parkingTicketService.scanTicket(id);
    }
}
