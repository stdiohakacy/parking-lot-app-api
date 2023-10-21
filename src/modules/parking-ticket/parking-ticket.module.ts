import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { ParkingTicketService } from './services/parking-ticket.service';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingTicketEntity,
            ParkingLotEntity,
            VehicleEntity,
        ]),
        ParkingLotModule,
    ],
    providers: [ParkingTicketService],
    exports: [ParkingTicketService],
})
export class ParkingTicketModule {}
