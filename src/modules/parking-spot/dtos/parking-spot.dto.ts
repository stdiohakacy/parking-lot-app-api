import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { faker } from '@faker-js/faker';
export class ParkingSpotDTO extends BaseDTO {
    @ApiProperty({
        name: 'parkingSpotType',
        description: 'Type of parking spot',
        example: ENUM_PARKING_SPOT_TYPE.LARGE,
        type: String,
        nullable: false,
        required: true,
    })
    @IsEnum(ENUM_PARKING_SPOT_TYPE)
    @IsNotEmpty()
    @Type(() => String)
    parkingSpotType: ENUM_PARKING_SPOT_TYPE;

    @ApiProperty({
        name: 'isFree',
        description: 'Parking spot is free or not?',
        example: true,
        type: Boolean,
        nullable: false,
        required: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    isFree: boolean;

    @ApiProperty({
        name: 'parkingLotId',
        description: 'Parking lot id of parking spot',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
