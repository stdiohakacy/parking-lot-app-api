import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingRateEntity } from '../entities/parking-rate.entity';
import { Repository } from 'typeorm';
import { ENUM_VEHICLE_TYPE } from 'src/modules/vehicle/constants/vehicle.enum.constant';
import {
    CarParkingStrategy,
    MotorcycleParkingStrategy,
    TruckParkingStrategy,
    VanParkingStrategy,
} from '../patterns/vehicle.parking.strategy';

@Injectable()
export class ParkingRateService {
    constructor(
        @InjectRepository(ParkingRateEntity)
        private readonly parkingRateRepo: Repository<ParkingRateEntity>,
        private readonly carParkingStrategy: CarParkingStrategy,
        private readonly truckParkingStrategy: TruckParkingStrategy,
        private readonly vanParkingStrategy: VanParkingStrategy,
        private readonly motorcycleParkingStrategy: MotorcycleParkingStrategy
    ) {}

    async getLatestParkingRate() {
        return await this.parkingRateRepo.findOne({
            order: { createdAt: 'DESC' },
        });
    }

    calculateParkingFree(
        vehicleType: ENUM_VEHICLE_TYPE,
        parkingDuration: number
    ) {
        switch (vehicleType) {
            case ENUM_VEHICLE_TYPE.CAR:
                return this.carParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.TRUCK:
                return this.truckParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.VAN:
                return this.vanParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.MOTORCYCLE:
                return this.motorcycleParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            default:
                throw new NotFoundException('Invalid vehicle type');
        }
    }
}
