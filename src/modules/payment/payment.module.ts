import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentService } from './services/payment.service';
import { CashPaymentStrategy } from './patterns/cash.payment.strategy';
import { ParkingTicketEntity } from '../parking-ticket/entities/parking-ticket.entity';
import { ParkingRateModule } from '../parking-rate/parking-rate.module';
import { ParkingRateEntity } from '../parking-rate/entities/parking-rate.entity';
import { CreditCardPaymentStrategy } from './patterns/credit-card.payment.strategy';

const services = [PaymentService];
const strategies = [CashPaymentStrategy, CreditCardPaymentStrategy];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity,
            ParkingRateEntity,
            ParkingTicketEntity,
        ]),
        ParkingRateModule,
    ],
    providers: [...services, ...strategies],
    exports: [...services, ...strategies],
})
export class PaymentModule {}
