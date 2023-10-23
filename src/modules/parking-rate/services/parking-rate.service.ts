import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingRateEntity } from '../entities/parking-rate.entity';
import { ENUM_VEHICLE_TYPE } from 'src/modules/vehicle/constants/vehicle.enum.constant';
import { MotorcycleParkingStrategy } from '../patterns/motorcycle.parking.strategy';
import { CarParkingStrategy } from '../patterns/car.parking.strategy';
import { TruckParkingStrategy } from '../patterns/truck.parking.strategy';
import { VanParkingStrategy } from '../patterns/van.parking.strategy';
import { ENUM_VEHICLE_STATUS_CODE_ERROR } from 'src/modules/vehicle/constants/vehicle.status-code.constant';

@Injectable()
export class ParkingRateService {
    constructor(
        @InjectRepository(ParkingRateEntity)
        private readonly carParkingStrategy: CarParkingStrategy,
        private readonly truckParkingStrategy: TruckParkingStrategy,
        private readonly vanParkingStrategy: VanParkingStrategy,
        private readonly motorcycleParkingStrategy: MotorcycleParkingStrategy
    ) {}

    async calculateParkingFree(
        vehicleType: ENUM_VEHICLE_TYPE,
        parkingDuration: number
    ) {
        switch (vehicleType) {
            case ENUM_VEHICLE_TYPE.CAR:
                return await this.carParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.TRUCK:
                return await this.truckParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.VAN:
                return await this.vanParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            case ENUM_VEHICLE_TYPE.MOTORCYCLE:
                return await this.motorcycleParkingStrategy.calculateParkingFee(
                    parkingDuration
                );
            default:
                throw new NotFoundException({
                    statusCode:
                        ENUM_VEHICLE_STATUS_CODE_ERROR.VEHICLE_NOT_FOUND_ERROR,
                    message: 'vehicle.error.notFound',
                });
        }
    }
}
