import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingTicketEntity } from '../entities/parking-ticket.entity';
import { ParkingTicketCreateDTO } from '../dtos/parking-ticket.create.dto';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from 'src/modules/parking-lot/constants/parking-lot.status-code.constant';
import { HelperDateService } from 'src/core/helper/services/helper.date.service';
import { instanceToPlain } from 'class-transformer';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';

@Injectable()
export class ParkingTicketService {
    constructor(
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>,
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>,
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepo: Repository<VehicleEntity>,
        private readonly helperDateService: HelperDateService
    ) {}

    private async generateTicketNo() {
        const lastParkingTicket = await this.parkingTicketRepo.find({
            take: 1,
            order: { createdAt: 'DESC' },
        });

        if (!lastParkingTicket.length) {
            return 'Ticket-No-1';
        }

        const lastNoParkingTicket = Number(
            lastParkingTicket[0].ticketNo.split('-')[2]
        );

        return `Ticket-No-${lastNoParkingTicket + 1}`;
    }

    async takeTicket(dto: ParkingTicketCreateDTO) {
        const { parkingLotId, licenseNo } = dto;

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

        const parkingTicketNo = await this.generateTicketNo();

        const vehicleCreated = await this.vehicleRepo.save(
            this.vehicleRepo.create({ licenseNo })
        );

        const parkingTicketCreated = await this.parkingTicketRepo.save(
            this.parkingTicketRepo.create({
                parkingLotId,
                ticketNo: parkingTicketNo,
                timeIn: this.helperDateService.create(),
                vehicleId: vehicleCreated.id,
            })
        );

        return instanceToPlain({ data: parkingTicketCreated });
    }
}
