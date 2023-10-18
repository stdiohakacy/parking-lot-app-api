import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsUUID, isNotEmpty } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingSpotDTO extends BaseDTO {
    @ApiProperty({ example: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    isFree: boolean;

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
