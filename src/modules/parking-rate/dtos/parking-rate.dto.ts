import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingRateDTO extends BaseDTO {
    @ApiProperty({
        name: 'hours',
        description: 'Hours of parking rate',
        example: 1,
        nullable: false,
        required: true,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    hours: number;

    @ApiProperty({
        name: 'rate',
        description: 'Rate of parking rate',
        example: 100,
        nullable: false,
        required: true,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    rate: number;

    @ApiProperty({
        name: 'parkingLotId',
        description: 'Parking lot id of parking rate',
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
