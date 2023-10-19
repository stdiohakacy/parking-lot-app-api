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
import { ExitEntity } from '../entities/exit.entity';
import { ExitCreateDTO } from '../dtos/exit.create.dto';
import { ENUM_EXIT_STATUS_CODE_ERROR } from '../constants/exit.status-code.constant';

@Injectable()
export class ExitService {
    constructor(
        @InjectRepository(ExitEntity)
        private readonly exitRepo: Repository<ExitEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async create(dto: ExitCreateDTO) {
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

        const isEntranceExist = await this.exitRepo.findOne({
            where: { name },
        });

        if (isEntranceExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_EXIT_STATUS_CODE_ERROR.EXIT_NAME_ALREADY_EXIST_ERROR,
                message: 'exit.error.nameExist',
            });
        }

        const exitCreated = await this.exitRepo.save(dto);
        return instanceToPlain({ data: exitCreated });
    }
}
