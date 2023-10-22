import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { ParkingTicketService } from './parking-ticket.service';

@Module({
    imports: [TypeOrmModule.forFeature([ParkingTicketEntity])],
    providers: [ParkingTicketService],
    exports: [ParkingTicketService],
})
export class ParkingTicketModule {}
