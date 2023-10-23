import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';

export class ParkingRateDTO extends BaseDTO {
    @ApiProperty({
        name: 'hours',
        description: 'Hours of parking rate',
        example: 10,
        type: Number,
        nullable: false,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    hours: number;

    @ApiProperty({
        name: 'rate',
        description: 'Rate of parking rate',
        example: 2000,
        type: String,
        nullable: false,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    rate: number;
}
