import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRateEntity } from './entities/parking-rate.entity';
import { ParkingRateService } from './services/parking-rate.service';
import { MotorcycleParkingStrategy } from './patterns/motorcycle.parking.strategy';
import { CarParkingStrategy } from './patterns/car.parking.strategy';
import { VanParkingStrategy } from './patterns/van.parking.strategy';
import { TruckParkingStrategy } from './patterns/truck.parking.strategy';

const services = [ParkingRateService];
const strategies = [
    MotorcycleParkingStrategy,
    CarParkingStrategy,
    VanParkingStrategy,
    TruckParkingStrategy,
];
@Module({
    imports: [TypeOrmModule.forFeature([ParkingRateEntity])],
    providers: [...services, ...strategies],
    exports: [...services, ...strategies],
})
export class ParkingRateModule {}
