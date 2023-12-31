import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { ParkingTicketDTO } from '../dtos/parking-ticket.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { PaymentEntity } from '../../../modules/payment/entities/payment.entity';
import { ParkingSpotVehicleEntity } from '../../../modules/parking-spot/entities/parking-spot-vehicle.entity';

export interface IParkingTicketEntity extends IBaseEntity<ParkingTicketDTO> {
    entryTime: Date;
    exitTime?: Date;
    parkingSpotVehicleId?: string;
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

    @OneToOne(() => ParkingSpotVehicleEntity)
    @JoinColumn({ name: 'parkingSpotVehicleId' })
    parkingSpotVehicle?: ParkingSpotVehicleEntity;

    @OneToOne(() => PaymentEntity, (payment) => payment.parkingTicket)
    @JoinColumn({ name: 'paymentId' })
    payment?: PaymentEntity;

    paymentSucceed(data: { exitTime: Date; paymentId: string }) {
        const { exitTime, paymentId } = data;
        this.exitTime = exitTime;
        this.paymentId = paymentId;
        return this;
    }
}
