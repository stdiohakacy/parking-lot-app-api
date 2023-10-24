import { ParkingSpotEventService } from './../events/parking-spot.event.service';
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
import { ParkingSpotVehicleEntity } from '../entities/parking-spot-vehicle.entity';
import { ParkingTicketEntity } from 'src/modules/parking-ticket/entities/parking-ticket.entity';
import { ENUM_PARKING_TICKET_STATUS_CODE_ERROR } from 'src/modules/parking-ticket/constants/parking-ticket.status-code.constant';
import { OnEvent } from '@nestjs/event-emitter';
import { ENUM_PARKING_SPOT_EVENT } from '../constants/parking-spot.enum.constant';

@Injectable()
export class ParkingSpotService {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>,
        @InjectRepository(ParkingSpotVehicleEntity)
        private readonly parkingSpotVehicleRepo: Repository<ParkingSpotVehicleEntity>,
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>,
        private readonly vehicleService: VehicleService,
        private readonly parkingSpotEventService: ParkingSpotEventService
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

        this.parkingSpotEventService.parkingSpotPark(
            parkingSpotUpdated.id,
            dto
        );
    }

    @OnEvent(ENUM_PARKING_SPOT_EVENT.PARKING_SPOT_UPDATED)
    async parkingSpotPark(id: string, dto: ParkingSpotParkVehicleDTO) {
        const { vehicleType, licenseNo, parkingTicketId } = dto;
        const vehicleCreated = await this.vehicleService.create({
            vehicleType,
            licenseNo,
        });
        const parkingSpotVehicleCreated =
            await this.parkingSpotVehicleRepo.save(
                this.parkingSpotVehicleRepo.create({
                    parkingSpotId: id,
                    vehicleId: vehicleCreated.id,
                })
            );
        const parkingTicket = await this.parkingTicketRepo.findOne({
            where: {
                id: parkingTicketId,
            },
        });
        if (!parkingTicket) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_TICKET_STATUS_CODE_ERROR.PARKING_TICKET_NOT_FOUND_ERROR,
                message: 'parkingTicket.error.notFound',
            });
        }
        parkingTicket.parkingSpotVehicleId = parkingSpotVehicleCreated.id;
        await this.parkingTicketRepo.save(parkingTicket);
    }
}
