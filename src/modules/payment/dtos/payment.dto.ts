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
import {
    ENUM_PAYMENT_METHOD,
    ENUM_PAYMENT_STATUS,
} from '../constants/payment.enum.constant';
import { faker } from '@faker-js/faker';

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
    paymentMethod: ENUM_PAYMENT_METHOD;

    @ApiProperty({
        name: 'paymentStatus',
        description: 'Status of payment',
        example: ENUM_PAYMENT_STATUS.CREATED,
        type: String,
        nullable: false,
        required: true,
    })
    @IsEnum(ENUM_PAYMENT_STATUS)
    @IsNotEmpty()
    @Type(() => String)
    paymentStatus: ENUM_PAYMENT_STATUS;

    @ApiProperty({
        name: 'parkingTicketId',
        description: 'Parking ticket id',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingTicketId: string;
}
