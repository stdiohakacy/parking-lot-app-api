import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { ParkingTicketDTO } from '../dtos/parking-ticket.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';
import { PaymentEntity } from '../../../modules/payment/entities/payment.entity';

export interface IParkingTicketEntity extends IBaseEntity<ParkingTicketDTO> {
    entryTime: Date;
    exitTime: Date;
    vehicleId: string;
    paymentId: string;
}

@Entity({ name: 'parking_tickets' })
@UseDTO(ParkingTicketDTO)
export class ParkingTicketEntity
    extends BaseEntity<ParkingTicketDTO>
    implements IParkingTicketEntity
{
    @Column({ name: 'entryTime', type: 'timestamptz' })
    entryTime: Date;

    @Column({ name: 'exitTime', type: 'timestamptz' })
    exitTime: Date;

    @Column({ name: 'vehicleId', type: 'uuid', nullable: true })
    vehicleId: string;

    @Column({ name: 'paymentId', type: 'uuid', nullable: true })
    paymentId: string;

    @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.parkingTickets)
    @JoinColumn({ name: 'vehicleId' })
    vehicle?: VehicleEntity;

    @ManyToOne(() => PaymentEntity, (payment) => payment.parkingTickets)
    @JoinColumn({ name: 'paymentId' })
    payment?: PaymentEntity;
}
