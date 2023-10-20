import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';
import { ParkingSpotCreateDTO } from '../dtos/parking-spot.create.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from 'src/modules/parking-lot/constants/parking-lot.status-code.constant';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ParkingSpotService {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {}

    async create(dto: ParkingSpotCreateDTO) {
        const { parkingLotId } = dto;
        const isParkingLotExist = await this.parkingLotRepo.findOne({
            where: { id: parkingLotId },
        });

        if (!isParkingLotExist) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_ALREADY_EXIST_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }

        const parkingSpotCreated = await this.parkingSpotRepo.save(dto);
        return instanceToPlain({ data: parkingSpotCreated });
    }

    async createMany(dto: ParkingSpotCreateDTO[]) {
        await this.parkingSpotRepo.save(dto);
    }

    async remove(ids: string[]) {
        await this.parkingSpotRepo
            .createQueryBuilder('parkingSpot')
            .delete()
            .from(ParkingLotEntity)
            .where('id IN (:...ids)', { ids })
            .execute();
    }
}
