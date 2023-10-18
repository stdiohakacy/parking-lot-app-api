import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLotEntity } from '../entities/parking-lot.entity';
import { Repository } from 'typeorm';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../constants/parking-lot.status-code.constant';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ParkingLotService {
    constructor(
        @InjectRepository(ParkingLotEntity)
        private parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async getByName(name: string): Promise<ParkingLotEntity> {
        return await this.parkingLotRepo.findOne({ where: { name } });
    }

    async create(dto: ParkingLotCreateDTO) {
        const { name } = dto;
        const isParkingLotExist = await this.getByName(name);
        if (isParkingLotExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_ALREADY_EXIST_ERROR,
                message: 'parkingLot.error.nameExist',
            });
        }
        const parkingLotCreated = await this.parkingLotRepo.save(dto);
        return instanceToPlain({ data: parkingLotCreated });
    }
}
