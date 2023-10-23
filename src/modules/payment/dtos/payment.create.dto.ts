import { PickType } from '@nestjs/swagger';
import { PaymentDTO } from './payment.dto';

export class PaymentCreateDTO extends PickType(PaymentDTO, [
    'amount',
    'paymentTime',
    'paymentMethod',
    'paymentStatus',
]) {}
