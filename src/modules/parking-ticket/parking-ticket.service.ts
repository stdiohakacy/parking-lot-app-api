import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { HelperDateService } from '../../core/helper/services/helper.date.service';
import { ParkingRateService } from '../parking-rate/services/parking-rate.service';
import { ENUM_HELPER_DATE_DIFF } from '../../core/helper/constants/helper.enum.constant';

@Injectable()
export class ParkingTicketService {
    constructor(
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>,
        private readonly helperDateService: HelperDateService,
        private readonly parkingRateService: ParkingRateService
    ) {}

    async takeTicket() {
        const parkingTicket = await this.parkingTicketRepo.create({
            entryTime: this.helperDateService.create(),
        });
        const parkingTicketCreated =
            await this.parkingTicketRepo.save(parkingTicket);

        return instanceToPlain({ data: parkingTicketCreated });
    }

    async scanTicket(id: string) {
        const parkingTicket = await this.parkingTicketRepo
            .createQueryBuilder('parkingTicket')
            .leftJoinAndSelect(
                'parkingTicket.parkingSpotVehicle',
                'parkingSpotVehicle'
            )
            .leftJoinAndSelect('parkingSpotVehicle.vehicle', 'vehicle')
            .where('parkingTicket.id = :id', { id })
            .getOne();

        const vehicle = parkingTicket.parkingSpotVehicle.vehicle;
        const parkingDuration = this.helperDateService.diff(
            parkingTicket.entryTime,
            this.helperDateService.create(),
            { format: ENUM_HELPER_DATE_DIFF.HOURS }
        );

        const price = await this.parkingRateService.calculateParkingFree(
            vehicle.vehicleType,
            parkingDuration
        );

        return instanceToPlain({ data: { price } });
    }
}
