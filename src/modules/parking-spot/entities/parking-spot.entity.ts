import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingSpotDTO } from '../dtos/parking-spot.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IParkingSpotEntity extends IBaseEntity<ParkingSpotDTO> {
    isFree: boolean;
}

@Entity({ name: 'parking-spots' })
@UseDTO(ParkingSpotDTO)
export class ParkingSpotEntity
    extends BaseEntity<ParkingSpotDTO>
    implements IParkingSpotEntity
{
    @Column({ name: 'isFree' })
    isFree: boolean;

    @Column({ type: 'uuid', name: 'parkingLotId' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot: ParkingLotEntity;
}
