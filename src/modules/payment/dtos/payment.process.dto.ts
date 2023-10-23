import { PickType } from '@nestjs/swagger';
import { PaymentDTO } from './payment.dto';

export class PaymentProcessPaymentDTO extends PickType(PaymentDTO, [
    'paymentMethod',
    'amount',
    'parkingTicketId',
]) {}
