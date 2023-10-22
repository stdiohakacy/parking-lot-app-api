import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
export class ParkingLotDTO extends BaseDTO {
    @ApiProperty({
        name: 'name',
        description: 'Name of parking lot',
        example: 'Paring lot 01',
        type: String,
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;

    @ApiProperty({
        name: 'address',
        description: 'Address of parking lot',
        example: '01 Nguyen Hue',
        type: String,
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    address: string;

    @ApiProperty({
        name: 'capacity',
        description: 'Capacity of parking lot',
        example: 40000,
        type: Number,
        nullable: false,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    capacity: number;
}
