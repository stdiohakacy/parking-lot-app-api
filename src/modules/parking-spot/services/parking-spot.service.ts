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
import { ENUM_PARKING_SPOT_STATUS_CODE_ERROR } from '../constants/parking-spot.status-code.constant';
import { ParkingSpotParkingVehicleDTO } from '../dtos/parking-spot.park-vehicle.dto';
import { VehicleEntity } from 'src/modules/vehicle/entities/vehicle.entity';
import { ENUM_VEHICLE_STATUS_CODE_ERROR } from 'src/modules/vehicle/constants/vehicle.status-code.constant';
import { ParkingSpotFactory } from '../factory/parking-spot.factory';

@Injectable()
export class ParkingSpotService {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>,
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepo: Repository<VehicleEntity>,
        private readonly parkingSpotFactory: ParkingSpotFactory
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

    async parkVehicle(dto: ParkingSpotParkingVehicleDTO) {
        const { id, licenseNo } = dto;
        const parkingSpot = await this.parkingSpotRepo.findOne({
            where: { id },
        });
        if (!parkingSpot) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_SPOT_STATUS_CODE_ERROR.PARKING_SPOT_NOT_FOUND_ERROR,
                message: 'parkingSpot.error.notFound',
            });
        }
        if (!parkingSpot.isFree) {
            throw new ConflictException({
                statusCode:
                    ENUM_PARKING_SPOT_STATUS_CODE_ERROR.PARKING_SPOT_ALREADY_USED_ERROR,
                message: 'parkingSpot.error.alreadyUsed',
            });
        }
        const vehicle = await this.vehicleRepo.findOne({
            where: { licenseNo },
        });
        if (!vehicle) {
            throw new NotFoundException({
                statusCode:
                    ENUM_VEHICLE_STATUS_CODE_ERROR.VEHICLE_NOT_FOUND_ERROR,
                message: 'vehicle.error.notFound',
            });
        }

        vehicle.parkingSpotId = id;
        parkingSpot.isFree = false;
        await Promise.all([
            this.vehicleRepo.save(vehicle),
            this.parkingSpotRepo.save(parkingSpot),
        ]);
    }
}
