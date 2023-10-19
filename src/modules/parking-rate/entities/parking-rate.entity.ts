import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { ParkingRateDTO } from '../dtos/parking-rate.dto';

export interface IParkingRateEntity extends IBaseEntity<ParkingRateDTO> {
    hours: number;
    rate: number;
    parkingLotId: string;
}

@Entity({ name: 'parking-rates' })
@UseDTO(ParkingRateDTO)
export class ParkingRateEntity
    extends BaseEntity<IParkingRateEntity>
    implements IParkingRateEntity
{
    @Column({ name: 'hours' })
    hours: number;

    @Column({ name: 'rate' })
    rate: number;

    @Column({ name: 'parkingLotId' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot: ParkingLotEntity;
}
