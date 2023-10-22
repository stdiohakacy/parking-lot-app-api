import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingTicketDTO extends BaseDTO {
    @ApiProperty({
        name: 'entryTime',
        description: 'Entry time of parking ticket',
        example: new Date(),
        type: Date,
        nullable: false,
        required: true,
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    entryTime: Date;

    @ApiProperty({
        name: 'exitTime',
        description: 'Exit time of parking ticket',
        example: new Date(),
        type: Date,
        nullable: false,
        required: true,
    })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    exitTime: Date;

    @ApiProperty({
        name: 'vehicleId',
        description: 'Vehicle id of parking ticket',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    vehicleId: string;

    @ApiProperty({
        name: 'paymentId',
        description: 'Payment id of parking ticket',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    paymentId: string;
}
