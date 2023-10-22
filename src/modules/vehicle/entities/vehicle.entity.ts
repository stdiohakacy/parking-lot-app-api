import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';
import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';

export interface IVehicleEntity extends IBaseEntity<VehicleDTO> {
    licenseNo: string;
    vehicleType: ENUM_VEHICLE_TYPE;
    parkingSpotId: string;
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

    @Column({ name: 'parkingSpotId', type: 'uuid', nullable: true })
    parkingSpotId: string;

    @ManyToOne(() => ParkingSpotEntity, (parkingSpot) => parkingSpot.vehicles)
    @JoinColumn({ name: 'parkingSpotId' })
    parkingSpot?: ParkingSpotEntity;

    @OneToMany(
        () => ParkingTicketEntity,
        (parkingTickets) => parkingTickets.vehicle
    )
    parkingTickets?: ParkingTicketEntity[];
}
