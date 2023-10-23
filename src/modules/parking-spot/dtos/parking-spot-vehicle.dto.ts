import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingSpotVehicleDTO extends BaseDTO {
    @ApiProperty({
        name: 'parkingSpotId',
        description: 'Parking spot id',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingSpotId: string;

    @ApiProperty({
        name: 'vehicleId',
        description: 'Vehicle id',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    vehicleId: string;
}
