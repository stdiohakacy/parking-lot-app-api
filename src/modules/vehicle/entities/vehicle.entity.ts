import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';
import { ParkingSpotVehicleEntity } from '../../../modules/parking-spot/entities/parking-spot-vehicle.entity';

export interface IVehicleEntity extends IBaseEntity<VehicleDTO> {
    licenseNo: string;
    vehicleType: ENUM_VEHICLE_TYPE;
}

@Entity({ name: 'vehicles' })
@UseDTO(VehicleDTO)
export class VehicleEntity
    extends BaseEntity<VehicleDTO>
    implements IVehicleEntity
{
    @Column({ name: 'licenseNo' })
    licenseNo: string;

    @Column({ name: 'vehicleType' })
    vehicleType: ENUM_VEHICLE_TYPE;

    @OneToMany(
        () => ParkingSpotVehicleEntity,
        (parkingSpotVehicles) => parkingSpotVehicles.vehicle
    )
    parkingSpotVehicles?: ParkingSpotVehicleEntity[];
}
