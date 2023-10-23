import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { ParkingTicketService } from './parking-ticket.service';
import { ParkingRateModule } from '../parking-rate/parking-rate.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingTicketEntity]),
        ParkingRateModule,
    ],
    providers: [ParkingTicketService],
    exports: [ParkingTicketService],
})
export class ParkingTicketModule {}
