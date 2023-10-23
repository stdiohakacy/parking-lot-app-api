import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentCreateDTO } from '../dtos/payment.create.dto';
import { ENUM_PAYMENT_METHOD } from '../constants/payment.enum.constant';
import { CashPaymentStrategy } from '../patterns/cash.payment.strategy';
import { PaymentProcessPaymentDTO } from '../dtos/payment.process.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepo: Repository<PaymentEntity>,
        private readonly cashPaymentStrategy: CashPaymentStrategy
    ) {}

    async create(dto: PaymentCreateDTO) {
        return await this.paymentRepo.create(dto);
    }

    async processPayment(dto: PaymentProcessPaymentDTO) {
        const { amount, paymentMethod, parkingTicketId } = dto;
        switch (paymentMethod) {
            case ENUM_PAYMENT_METHOD.CASH:
                return await this.cashPaymentStrategy.processPayment(
                    parkingTicketId,
                    amount
                );
            // case ENUM_PAYMENT_METHOD.CREDIT_CARD:
            //     return this.creditCardPaymentStrategy.processPayment(amount);
            default:
                throw new Error('Invalid payment method');
        }
    }
}
