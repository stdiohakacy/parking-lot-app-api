import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { PaymentDTO } from '../dtos/payment.dto';
import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';
import {
    ENUM_PAYMENT_METHOD,
    ENUM_PAYMENT_STATUS,
} from '../constants/payment.enum.constant';

export interface IPaymentDTO extends IBaseEntity<PaymentDTO> {
    amount: number;
    paymentTime: Date;
    paymentMethod: string;
}

@Entity({ name: 'payments' })
@UseDTO(PaymentDTO)
export class PaymentEntity
    extends BaseEntity<PaymentDTO>
    implements IPaymentDTO
{
    @Column({ name: 'amount' })
    amount: number;

    @Column({ name: 'paymentTime' })
    paymentTime: Date;

    @Column({ name: 'paymentMethod' })
    paymentMethod: ENUM_PAYMENT_METHOD;

    @Column({ name: 'paymentStatus' })
    paymentStatus: ENUM_PAYMENT_STATUS;

    @Column({ name: 'parkingTicketId', type: 'uuid', nullable: true })
    parkingTicketId?: string;

    @OneToOne(
        () => ParkingTicketEntity,
        (parkingTicket) => parkingTicket.payment
    )
    @JoinColumn({ name: 'parkingTicketId' })
    parkingTicket?: ParkingTicketEntity;

    processPaymentStatus(paymentStatus: ENUM_PAYMENT_STATUS) {
        this.paymentStatus = paymentStatus;
        return this;
    }
}
