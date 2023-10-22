import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingSpotService {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>
    ) {}

    async findAll() {
        return await this.parkingSpotRepo.find();
    }

    async create(payload) {
        await this.parkingSpotRepo.save(payload);
    }

    async remove(ids: string[]) {
        await this.parkingSpotRepo
            .createQueryBuilder('parkingSpot')
            .delete()
            .from(ParkingSpotEntity)
            .where('id IN (...ids)', { ids })
            .execute();
    }
}
