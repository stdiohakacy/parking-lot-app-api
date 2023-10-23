import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { HelperDateService } from 'src/core/helper/services/helper.date.service';

@Injectable()
export class ParkingTicketService {
    constructor(
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>,
        private readonly helperDateService: HelperDateService
    ) {}

    async takeTicket() {
        const parkingTicket = await this.parkingTicketRepo.create({
            entryTime: this.helperDateService.create(),
        });
        return await this.parkingTicketRepo.save(parkingTicket);
    }

    async scanTicket(id: string) {
        const parkingTicket = await this.parkingTicketRepo
            .createQueryBuilder('parkingTicket')
            .leftJoinAndSelect('parkingTicket.vehicle', 'vehicle')
            .where('parkingTicket.id = :id', { id })
            .getOne();

        console.log(parkingTicket);
    }
}
