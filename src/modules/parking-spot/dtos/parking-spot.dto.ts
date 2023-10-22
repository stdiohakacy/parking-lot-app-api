import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsUUID,
    isNotEmpty,
} from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';

export class ParkingSpotDTO extends BaseDTO {
    @ApiProperty({ example: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    isFree: boolean;

    @ApiProperty({
        name: 'type',
        example: ENUM_PARKING_SPOT_TYPE.LARGE,
        required: true,
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsEnum(ENUM_PARKING_SPOT_TYPE)
    @Type(() => String)
    parkingSpotType: ENUM_PARKING_SPOT_TYPE;

    @ApiProperty({
        name: 'parkingLotId',
        example: faker.string.uuid(),
        required: true,
        nullable: false,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
