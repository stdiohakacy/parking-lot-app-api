import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class VehicleDTO extends BaseDTO {
    @ApiProperty({
        name: 'licenseNo',
        description: 'License No of vehicle',
        example: faker.string.alphanumeric(10).toUpperCase(),
        nullable: true,
        required: false,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    licenseNo: string;

    @ApiProperty({
        name: 'parkingSpotId',
        description: 'Parking spot id of vehicle',
        example: faker.string.uuid(),
        nullable: false,
        required: true,
        type: String,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingSpotId: string;
}
