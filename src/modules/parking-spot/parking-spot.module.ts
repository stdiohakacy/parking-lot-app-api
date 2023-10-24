import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotService } from './services/parking-spot.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ParkingSpotVehicleEntity } from './entities/parking-spot-vehicle.entity';
import { ParkingTicketEntity } from '../parking-ticket/entities/parking-ticket.entity';
import { ParkingSpotEventService } from './events/parking-spot.event.service';

const services = [ParkingSpotService, ParkingSpotEventService];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingSpotEntity,
            ParkingSpotVehicleEntity,
            ParkingTicketEntity,
        ]),
        VehicleModule,
    ],
    providers: [...services],
    exports: [...services],
})
export class ParkingSpotModule {}
