import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotDTO } from '../dtos/parking-lot.dto';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';
import { EntranceEntity } from '../../../modules/entrance/entities/entrance.entity';

export interface IParkingLotEntity extends IBaseEntity<ParkingLotDTO> {
    name: string;
    address: string;
}

@Entity({ name: 'parking-lots' })
@UseDTO(ParkingLotDTO)
export class ParkingLotEntity
    extends BaseEntity<ParkingLotDTO>
    implements IParkingLotEntity
{
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'address' })
    address: string;

    @OneToMany(
        () => ParkingSpotEntity,
        (parkingSpots) => parkingSpots.parkingLot
    )
    parkingSpots: ParkingSpotEntity[];

    @OneToMany(() => EntranceEntity, (entrances) => entrances.parkingLot)
    entrances: EntranceEntity[];
}
