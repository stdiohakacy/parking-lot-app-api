import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/vehicle.entity';
import { VehicleCreateDTO } from '../dtos/vehicle.create.dto';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepo: Repository<VehicleEntity>
    ) {}

    async create(dto: VehicleCreateDTO) {
        return await this.vehicleRepo.save(this.vehicleRepo.create(dto));
    }
}
