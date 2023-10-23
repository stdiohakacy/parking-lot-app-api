import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentCreateDTO } from '../dtos/payment.create.dto';
import { ENUM_PAYMENT_METHOD } from '../constants/payment.enum.constant';
import { CashPaymentStrategy } from '../patterns/cash.payment.strategy';
import { PaymentProcessPaymentDTO } from '../dtos/payment.process.dto';
import { CreditCardPaymentStrategy } from '../patterns/credit-card.payment.strategy';
import { ENUM_PAYMENT_STATUS_CODE_ERROR } from '../constants/payment.status-code.constant';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepo: Repository<PaymentEntity>,
        private readonly cashPaymentStrategy: CashPaymentStrategy,
        private readonly creditCardPaymentStrategy: CreditCardPaymentStrategy
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
            case ENUM_PAYMENT_METHOD.CREDIT_CARD:
                return this.creditCardPaymentStrategy.processPayment(
                    parkingTicketId,
                    amount
                );
            default:
                throw new BadRequestException({
                    statusCode:
                        ENUM_PAYMENT_STATUS_CODE_ERROR.PAYMENT_INVALID_METHOD_ERROR,
                    message: 'payment.error.invalidMethod',
                });
        }
    }
}
