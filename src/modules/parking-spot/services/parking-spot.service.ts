import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';
import { Repository } from 'typeorm';
import { ParkingSpotParkVehicleDTO } from '../dtos/parking-spot.park-vehicle.dto';
import { ENUM_PARKING_SPOT_STATUS_CODE_ERROR } from '../constants/parking-spot.status-code.constant';
import { VehicleService } from '../../../modules/vehicle/services/vehicle.service';

@Injectable()
export class ParkingSpotService {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>,
        private readonly vehicleService: VehicleService
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

    async parkVehicle(id: string, dto: ParkingSpotParkVehicleDTO) {
        const { vehicleType, licenseNo } = dto;
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

        const parkingSpotUpdated = await this.parkingSpotRepo.save(
            parkingSpot.spotUsed()
        );

        try {
            await this.vehicleService.create({
                vehicleType,
                licenseNo,
                parkingSpotId: parkingSpotUpdated.id,
            });
        } catch (error) {
            console.error(error);
        }
    }
}
