import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { ParkingTicketDTO } from '../dtos/parking-ticket.dto';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';

export interface IParkingTicketEntity extends IBaseEntity<ParkingTicketDTO> {
    ticketNo: string;
    timeIn?: Date;
    timeOut?: Date;
    amount?: number;
    parkingLotId: string;
}

@Entity({ name: 'parking-tickets' })
@UseDTO(ParkingTicketDTO)
export class ParkingTicketEntity
    extends BaseEntity<ParkingTicketDTO>
    implements IParkingTicketEntity
{
    @Column({ name: 'ticketNo' })
    ticketNo: string;

    @Column({ name: 'timeIn', nullable: true, type: 'timestamptz' })
    timeIn?: Date;

    @Column({ name: 'timeOut', nullable: true, type: 'timestamptz' })
    timeOut?: Date;

    @Column({ name: 'amount', nullable: true, default: 0 })
    amount?: number;

    @Column({ name: 'parkingLotId', type: 'uuid' })
    parkingLotId: string;

    @Column({ name: 'vehicleId', type: 'uuid' })
    vehicleId: string;

    @ManyToOne(
        () => ParkingLotEntity,
        (parkingLot) => parkingLot.parkingTickets
    )
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot: ParkingLotEntity;

    @ManyToOne(
        () => ParkingTicketEntity,
        (parkingTickets) => parkingTickets.vehicle
    )
    @JoinColumn({ name: 'vehicleId' })
    vehicle: VehicleEntity;
}
