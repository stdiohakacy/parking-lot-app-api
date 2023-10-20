import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingTicketService } from '../services/parking-ticket.service';
import { ParkingTicketCreateDTO } from '../dtos/parking-ticket.create.dto';
import { ParkingTicketPublicTakeTicketDoc } from '../docs/parking-ticket.public.doc';
import { Response } from 'src/core/response/decorators/response.decorator';

@ApiTags('modules.public.parking-ticket')
@Controller({ version: '1', path: '/parking-tickets' })
export class ParkingTicketPublicController {
    constructor(private readonly parkingTicketService: ParkingTicketService) {}

    @ParkingTicketPublicTakeTicketDoc()
    @Response('parkingTicket.takeTicket')
    @HttpCode(HttpStatus.OK)
    @Post('/')
    async takeTicket(@Body() payload: ParkingTicketCreateDTO) {
        return await this.parkingTicketService.takeTicket(payload);
    }
}
