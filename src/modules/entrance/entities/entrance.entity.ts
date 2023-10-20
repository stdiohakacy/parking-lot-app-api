import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { EntranceDTO } from '../dtos/entrance.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IEntranceEntity extends IBaseEntity<EntranceDTO> {
    name: string;
}

@Entity({ name: 'entrances' })
@UseDTO(EntranceDTO)
export class EntranceEntity
    extends BaseEntity<EntranceDTO>
    implements IEntranceEntity
{
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'parkingLotId', type: "uuid" })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot: ParkingLotEntity;
}
