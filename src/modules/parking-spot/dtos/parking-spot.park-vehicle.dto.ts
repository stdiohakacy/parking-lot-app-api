import { PickType } from '@nestjs/swagger';
import { VehicleCreateDTO } from 'src/modules/vehicle/dtos/vehicle.create.dto';

export class ParkingSpotParkVehicleDTO extends PickType(VehicleCreateDTO, [
    'licenseNo',
    'vehicleType',
]) {}
