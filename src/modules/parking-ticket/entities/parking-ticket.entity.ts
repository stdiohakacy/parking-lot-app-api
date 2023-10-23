import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { ParkingTicketDTO } from '../dtos/parking-ticket.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';
import { PaymentEntity } from '../../../modules/payment/entities/payment.entity';
import { ParkingSpotVehicleEntity } from 'src/modules/parking-spot/entities/parking-spot-vehicle.entity';

export interface IParkingTicketEntity extends IBaseEntity<ParkingTicketDTO> {
    entryTime: Date;
    exitTime?: Date;
    vehicleId?: string;
    paymentId?: string;
}

@Entity({ name: 'parking_tickets' })
@UseDTO(ParkingTicketDTO)
export class ParkingTicketEntity
    extends BaseEntity<ParkingTicketDTO>
    implements IParkingTicketEntity
{
    @Column({ name: 'entryTime', type: 'timestamptz' })
    entryTime: Date;

    @Column({ name: 'exitTime', type: 'timestamptz', nullable: true })
    exitTime?: Date;

    @Column({ name: 'parkingSpotVehicleId', type: 'uuid', nullable: true })
    parkingSpotVehicleId?: string;

    @Column({ name: 'paymentId', type: 'uuid', nullable: true })
    paymentId?: string;

    @OneToOne(
        () => ParkingSpotVehicleEntity,
        (parkingSpotVehicle) => parkingSpotVehicle.parkingTicket
    )
    @JoinColumn({ name: 'parkingSpotId' })
    parkingSpotVehicle?: ParkingSpotVehicleEntity;

    @OneToOne(() => PaymentEntity, (payment) => payment.parkingTicket)
    @JoinColumn({ name: 'paymentId' })
    payment?: PaymentEntity;
}
