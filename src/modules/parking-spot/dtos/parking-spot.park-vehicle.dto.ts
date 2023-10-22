import { ApiProperty, PickType } from '@nestjs/swagger';
import { ParkingSpotDTO } from './parking-spot.dto';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ParkingSpotParkingVehicleDTO extends PickType(ParkingSpotDTO, [
    'id',
]) {
    @ApiProperty({
        name: 'licenseNo',
        example: faker.string.alphanumeric(10).toUpperCase(),
        required: true,
        nullable: false,
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    licenseNo: string;
}
