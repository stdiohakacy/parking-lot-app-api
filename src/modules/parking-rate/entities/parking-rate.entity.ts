import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingRateDTO } from '../dtos/parking-rate.dto';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';

export interface IParkingRateEntity extends IBaseEntity<ParkingRateDTO> {
    hours: number;
    rate: number;
}

@Entity({ name: 'parking_rates' })
@UseDTO(ParkingRateDTO)
export class ParkingRateEntity
    extends BaseEntity<ParkingRateDTO>
    implements IParkingRateEntity
{
    @Column({ name: 'hours' })
    hours: number;

    @Column({ name: 'rate' })
    rate: number;

    @Column({ name: 'parkingLotId', type: 'uuid', nullable: true })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingRates)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;
}
