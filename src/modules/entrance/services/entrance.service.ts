import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntranceEntity } from '../entities/entrance.entity';
import { Repository } from 'typeorm';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from 'src/modules/parking-lot/constants/parking-lot.status-code.constant';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';
import { instanceToPlain } from 'class-transformer';
import { ENUM_ENTRANCE_STATUS_CODE_ERROR } from '../constants/entrance.status-code.constant';

@Injectable()
export class EntranceService {
    constructor(
        @InjectRepository(EntranceEntity)
        private readonly entranceRepo: Repository<EntranceEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async create(dto: EntranceCreateDTO) {
        const { parkingLotId, name } = dto;

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

        const isEntranceExist = await this.entranceRepo.findOne({
            where: { name },
        });

        console.log(isEntranceExist);
        if (isEntranceExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_ENTRANCE_STATUS_CODE_ERROR.ENTRANCE_NAME_ALREADY_EXIST_ERROR,
                message: 'entrance.error.nameExist',
            });
        }

        const entranceCreated = await this.entranceRepo.save(dto);
        return instanceToPlain({ data: entranceCreated });
    }
}
