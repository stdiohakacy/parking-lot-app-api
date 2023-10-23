import { InjectRepository } from '@nestjs/typeorm';
import { ParkingRateEntity } from '../entities/parking-rate.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TruckParkingStrategy {
    constructor(
        @InjectRepository(ParkingRateEntity)
        private readonly parkingRateRepo: Repository<ParkingRateEntity>
    ) {}

    async calculateParkingFee(parkingDuration: number): Promise<number> {
        const parkingRate = await this.parkingRateRepo
            .createQueryBuilder('parkingRate')
            .orderBy('parkingRate.createdAt', 'DESC')
            .getOne();
        return parkingDuration * (parkingRate.rate + 15);
    }
}
