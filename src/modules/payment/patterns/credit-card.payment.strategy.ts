import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTicketEntity } from 'src/modules/parking-ticket/entities/parking-ticket.entity';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { ParkingRateService } from 'src/modules/parking-rate/services/parking-rate.service';
import { HelperDateService } from 'src/core/helper/services/helper.date.service';
import { ENUM_PARKING_TICKET_STATUS_CODE_ERROR } from 'src/modules/parking-ticket/constants/parking-ticket.status-code.constant';
import { ENUM_HELPER_DATE_DIFF } from 'src/core/helper/constants/helper.enum.constant';
import { ENUM_PARKING_RATE_STATUS_CODE_ERROR } from 'src/modules/parking-rate/constants/parking-rate.status-code.constant';
import {
    ENUM_PAYMENT_METHOD,
    ENUM_PAYMENT_STATUS,
} from '../constants/payment.enum.constant';
import { ENUM_PAYMENT_STATUS_CODE_ERROR } from '../constants/payment.status-code.constant';

@Injectable()
export class CreditCardPaymentStrategy {
    constructor(
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepo: Repository<PaymentEntity>,
        private readonly parkingRateService: ParkingRateService,
        private readonly helperDateService: HelperDateService
    ) {}

    async processPayment(parkingTicketId: string, amount: number) {
        const parkingTicket = await this.parkingTicketRepo
            .createQueryBuilder('parkingTicket')
            .leftJoinAndSelect(
                'parkingTicket.parkingSpotVehicle',
                'parkingSpotVehicle'
            )
            .leftJoinAndSelect('parkingSpotVehicle.vehicle', 'vehicle')
            .leftJoinAndSelect('parkingSpotVehicle.parkingSpot', 'parkingSpot')
            .where('parkingTicket.id = :id', { id: parkingTicketId })
            .getOne();

        if (!parkingTicket) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_TICKET_STATUS_CODE_ERROR.PARKING_TICKET_NOT_FOUND_ERROR,
                message: 'parkingTicket.error.notFound',
            });
        }
        if (parkingTicket.exitTime) {
            throw new ConflictException({
                statusCode:
                    ENUM_PARKING_TICKET_STATUS_CODE_ERROR.PARKING_TICKET_ALREADY_USED_ERROR,
                message: 'parkingTicket.error.alreadyUsed',
            });
        }

        const parkingDuration = Math.round(
            this.helperDateService.diff(
                parkingTicket.entryTime,
                this.helperDateService.create(),
                { format: ENUM_HELPER_DATE_DIFF.HOURS }
            )
        );

        const price = await this.parkingRateService.calculateParkingFree(
            parkingTicket.parkingSpotVehicle.vehicle.vehicleType,
            parkingDuration
        );

        if (!price || price !== amount) {
            throw new InternalServerErrorException({
                statusCode:
                    ENUM_PARKING_RATE_STATUS_CODE_ERROR.PARKING_RATE_INVALID_PRICE_ERROR,
                message: 'parkingRate.error.invalidPrice',
            });
        }

        let payment: PaymentEntity = null;
        try {
            payment = await this.paymentRepo.save(
                this.paymentRepo.create({
                    amount: price,
                    paymentMethod: ENUM_PAYMENT_METHOD.CREDIT_CARD,
                    paymentTime: this.helperDateService.create(),
                    paymentStatus: ENUM_PAYMENT_STATUS.CREATED,
                })
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                statusCode:
                    ENUM_PAYMENT_STATUS_CODE_ERROR.PAYMENT_UNKNOWN_ERROR,
                message: 'payment.error.unknownError',
            });
        }

        await this.paymentRepo.save(
            payment.processPaymentStatus(ENUM_PAYMENT_STATUS.PENDING)
        );

        const paymentUpdated = await this.paymentRepo.save(
            payment.processPaymentStatus(ENUM_PAYMENT_STATUS.SUCCEED)
        );

        parkingTicket.paymentSucceed({
            exitTime: this.helperDateService.create(),
            paymentId: paymentUpdated.id,
        });

        await this.parkingTicketRepo.save(parkingTicket);
    }
}
