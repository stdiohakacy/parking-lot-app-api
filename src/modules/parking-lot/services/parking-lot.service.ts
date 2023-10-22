import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLotEntity } from '../entities/parking-lot.entity';
import { Repository } from 'typeorm';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';

@Injectable()
export class ParkingLotService {
    constructor(
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async getByName(name: string) {
        return await this.parkingLotRepo.findOne({ where: { name } });
    }

    async findAll() {
        return await this.parkingLotRepo.find();
    }

    async create(payload: ParkingLotCreateDTO) {
        return await this.parkingLotRepo.save(payload);
    }

    async remove(ids: string[]) {
        await this.parkingLotRepo
            .createQueryBuilder('parkingLot')
            .delete()
            .from(ParkingLotEntity)
            .where('id IN (...ids)', { ids })
            .execute();
    }
}
