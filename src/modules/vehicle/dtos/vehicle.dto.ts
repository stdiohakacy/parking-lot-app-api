import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';
export class VehicleDTO extends BaseDTO {
    @ApiProperty({
        name: 'licenseNo',
        description: 'License No of vehicle',
        example: faker.string.alphanumeric(10).toUpperCase(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    licenseNo: string;

    @ApiProperty({
        name: 'vehicleType',
        description: 'Type of vehicle',
        example: ENUM_VEHICLE_TYPE.MOTORCYCLE,
        type: String,
        nullable: false,
        required: true,
    })
    @IsEnum(ENUM_VEHICLE_TYPE)
    @IsNotEmpty()
    @Type(() => String)
    vehicleType: ENUM_VEHICLE_TYPE;

    @ApiProperty({
        name: 'parkingSpotId',
        description: 'Parking spot id of vehicle',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingSpotId: string;
}
