import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';
import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';

export interface IVehicleEntity extends IBaseEntity<VehicleDTO> {
    licenseNo: string;
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

    @Column({ name: 'parkingSpotId', type: 'uuid' })
    parkingSpotId: string;

    @ManyToOne(() => ParkingSpotEntity, (parkingSpot) => parkingSpot.vehicles)
    @JoinColumn({ name: 'parkingSpotId' })
    parkingSpot: ParkingSpotEntity;

    @OneToMany(
        () => ParkingTicketEntity,
        (parkingTickets) => parkingTickets.vehicle
    )
    parkingTickets: ParkingTicketEntity[];
}
