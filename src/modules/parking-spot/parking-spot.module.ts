import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotService } from './services/parking-spot.service';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParkingSpotEntity,
            ParkingLotEntity,
            VehicleEntity,
        ]),
    ],
    providers: [ParkingSpotService],
    controllers: [],
    exports: [ParkingSpotService],
})
export class ParkingSpotModule {}
