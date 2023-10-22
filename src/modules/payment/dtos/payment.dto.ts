import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
} from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { ENUM_PAYMENT_METHOD } from '../constants/payment.enum.constant';

export class PaymentDTO extends BaseDTO {
    @ApiProperty({
        name: 'amount',
        description: 'Amount of payment',
        example: 0,
        type: Number,
        nullable: false,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    amount: number;

    @ApiProperty({
        name: 'paymentTime',
        description: 'Payment at?',
        example: new Date(),
        type: Date,
        nullable: false,
        required: true,
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    paymentTime: Date;

    @ApiProperty({
        name: 'paymentMethod',
        description: 'Method use for payment',
        example: ENUM_PAYMENT_METHOD.CASH,
        type: String,
        nullable: false,
        required: true,
    })
    @IsEnum(ENUM_PAYMENT_METHOD)
    @IsNotEmpty()
    @Type(() => String)
    paymentMethod: string;
}
