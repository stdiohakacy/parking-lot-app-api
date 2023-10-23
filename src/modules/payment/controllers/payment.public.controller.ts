import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/core/response/decorators/response.decorator';
import { PaymentService } from '../services/payment.service';
import { PaymentProcessPaymentDTO } from '../dtos/payment.process.dto';
import { PaymentPublicProcessPaymentDoc } from '../docs/payment.public.doc';

@ApiTags('modules.public.payment')
@Controller({ version: '1', path: '/payments' })
export class PaymentPublicController {
    constructor(private readonly paymentService: PaymentService) {}

    @PaymentPublicProcessPaymentDoc()
    @Response('payment.processPayment')
    @Post('/process')
    async processPayment(@Body() dto: PaymentProcessPaymentDTO) {
        return await this.paymentService.processPayment(dto);
    }
}
