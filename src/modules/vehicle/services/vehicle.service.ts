import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/vehicle.entity';
import { VehicleCreateDTO } from '../dtos/vehicle.create.dto';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleEntity: Repository<VehicleEntity>,
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>
    ) {}

    async create(dto: VehicleCreateDTO) {
        const { parkingSpotId, licenseNo } = dto;
        // const parkingLotExist = await this.parkingLotRepo.findOne({
        //     where: { id: parkingLotId },
        // });
        // if (!parkingLotExist) {
        //     throw new NotFoundException({
        //         statusCode:
        //             ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_NOT_FOUND_ERROR,
        //         message: 'parkingLot.error.notFound',
        //     });
        // }
        // const isEntranceExist = await this.exitRepo.findOne({
        //     where: { name },
        // });
        // if (isEntranceExist) {
        //     throw new ConflictException({
        //         statusCode:
        //             ENUM_EXIT_STATUS_CODE_ERROR.EXIT_NAME_ALREADY_EXIST_ERROR,
        //         message: 'exit.error.nameExist',
        //     });
        // }
        // const exitCreated = await this.exitRepo.save(dto);
        // return instanceToPlain({ data: exitCreated });
    }
}
