import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingTicketDTO extends BaseDTO {
    @ApiProperty({
        name: 'ticketNo',
        description: 'Ticket No. of Parking ticket',
        example: 'No.001',
        nullable: false,
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    ticketNo: string;

    @ApiProperty({
        name: 'licenseNo',
        description: 'License No of Parking ticket',
        example: faker.string.alphanumeric(10).toUpperCase(),
        nullable: false,
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    licenseNo: string;

    @ApiProperty({
        name: 'timeIn',
        description: 'Time in of parking ticket',
        example: faker.date.recent(),
        nullable: true,
        required: false,
        type: Date,
    })
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    @Type(() => Date)
    timeIn?: Date;

    @ApiProperty({
        name: 'timeOut',
        description: 'Time out of parking ticket',
        example: faker.date.recent(),
        nullable: true,
        required: false,
        type: Date,
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    timeOut?: Date;

    @ApiProperty({
        name: 'amount',
        description: 'Amount of parking ticket',
        example: 1000,
        nullable: true,
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    amount?: number;

    @ApiProperty({
        name: 'parkingLotId',
        description: 'Parking lot id of parking ticket',
        example: faker.string.uuid(),
        nullable: false,
        required: true,
        type: String,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
