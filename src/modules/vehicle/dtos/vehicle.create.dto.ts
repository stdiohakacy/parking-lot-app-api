import { PickType } from '@nestjs/swagger';
import { VehicleDTO } from './vehicle.dto';

export class VehicleCreateDTO extends PickType(VehicleDTO, [
    'licenseNo',
    'vehicleType',
    'parkingSpotId',
]) {}
