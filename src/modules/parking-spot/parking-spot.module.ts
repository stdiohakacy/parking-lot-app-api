import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotEntity } from './entities/parking-spot.entity';
import { ParkingSpotService } from './services/parking-spot.service';
import { VehicleModule } from '../vehicle/vehicle.module';
@Module({
    imports: [TypeOrmModule.forFeature([ParkingSpotEntity]), VehicleModule],
    providers: [ParkingSpotService],
    exports: [ParkingSpotService],
})
export class ParkingSpotModule {}
