import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../../../modules/parking-lot/constants/parking-lot.status-code.constant';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { instanceToPlain } from 'class-transformer';
import { ParkingRateEntity } from '../entities/parking-rate.entity';
import { ParkingRateCreateDTO } from '../dtos/parking-rate.create.dto';

@Injectable()
export class ParkingRateService {
    constructor(
        @InjectRepository(ParkingRateEntity)
        private readonly parkingRateRepo: Repository<ParkingRateEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async create(dto: ParkingRateCreateDTO) {
        const { parkingLotId } = dto;

        const parkingLotExist = await this.parkingLotRepo.findOne({
            where: { id: parkingLotId },
        });

        if (!parkingLotExist) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_NOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }

        const parkingRateCreated = await this.parkingRateRepo.save(dto);
        return instanceToPlain({ data: parkingRateCreated });
    }
}
