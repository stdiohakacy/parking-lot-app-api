import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';

export class ParkingLotDTO extends BaseDTO {
    @ApiProperty({
        example: faker.internet.userName({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        }),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    name: string;

    @ApiProperty({ example: faker.location.streetAddress(), required: true })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    address: string;
}
