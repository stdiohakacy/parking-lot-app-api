import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingSpotDTO } from '../dtos/parking-spot.dto';
import { ParkingSpotVehicleDTO } from '../dtos/parking-spot-vehicle.dto';
import { ParkingSpotEntity } from './parking-spot.entity';
import { VehicleEntity } from 'src/modules/vehicle/entities/vehicle.entity';
import { ParkingTicketEntity } from 'src/modules/parking-ticket/entities/parking-ticket.entity';

export interface IParkingSpotVehicleEntity
    extends IBaseEntity<ParkingSpotVehicleDTO> {
    parkingSpotId: string;
    vehicleId: string;
}

@Entity({ name: 'parking_spot_vehicles' })
@UseDTO(ParkingSpotDTO)
export class ParkingSpotVehicleEntity
    extends BaseEntity<ParkingSpotVehicleDTO>
    implements IParkingSpotVehicleEntity
{
    @Column({ name: 'parkingSpotId', type: 'uuid' })
    parkingSpotId: string;

    @Column({ name: 'vehicleId', type: 'uuid' })
    vehicleId: string;

    @Column({ name: 'vehicleId', type: 'uuid', nullable: true })
    parkingTicketId: string;

    @ManyToOne(
        () => ParkingSpotEntity,
        (parkingSpot) => parkingSpot.parkingSpotVehicles
    )
    @JoinColumn({ name: 'parkingSpotId' })
    parkingSpot?: ParkingSpotEntity;

    @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.parkingSpotVehicles)
    @JoinColumn({ name: 'vehicleId' })
    vehicle?: VehicleEntity;

    @OneToOne(
        () => ParkingTicketEntity,
        (parkingTicket) => parkingTicket.parkingSpotVehicle
    )
    @JoinColumn({ name: 'parkingTicketId' })
    parkingTicket?: ParkingTicketEntity;
}
