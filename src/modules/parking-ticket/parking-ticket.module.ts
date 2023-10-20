import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { ParkingTicketService } from './services/parking-ticket.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingTicketEntity, ParkingLotEntity]),
        ParkingLotModule,
    ],
    providers: [ParkingTicketService],
    exports: [ParkingTicketService],
})
export class ParkingTicketModule {}
