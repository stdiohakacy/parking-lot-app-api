import { faker } from '@faker-js/faker';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { VehicleCreateDTO } from 'src/modules/vehicle/dtos/vehicle.create.dto';

export class ParkingSpotParkVehicleDTO extends PickType(VehicleCreateDTO, [
    'licenseNo',
    'vehicleType',
]) {
    @ApiProperty({
        name: 'parkingTicketId',
        description: 'Parking ticket id',
        example: faker.string.uuid(),
        type: String,
        nullable: false,
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingTicketId: string;
}
