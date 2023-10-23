import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotService } from './services/parking-spot.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ParkingSpotVehicleEntity } from './entities/parking-spot-vehicle.entity';
import { ParkingTicketEntity } from '../parking-ticket/entities/parking-ticket.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingSpotEntity,
            ParkingSpotVehicleEntity,
            ParkingTicketEntity,
        ]),
        VehicleModule,
    ],
    providers: [ParkingSpotService],
    exports: [ParkingSpotService],
})
export class ParkingSpotModule {}
