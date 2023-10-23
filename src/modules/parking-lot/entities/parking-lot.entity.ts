import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotDTO } from '../dtos/parking-lot.dto';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';
import { ParkingRateEntity } from '../../../modules/parking-rate/entities/parking-rate.entity';

export interface IParkingLotEntity extends IBaseEntity<ParkingLotDTO> {
    name: string;
    address: string;
    capacity: number;
}

@Entity({ name: 'parking_lots' })
@UseDTO(ParkingLotDTO)
export class ParkingLotEntity
    extends BaseEntity<ParkingLotDTO>
    implements IParkingLotEntity
{
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'address' })
    address: string;

    @Column({ name: 'capacity', type: 'int' })
    capacity: number;

    @OneToMany(
        () => ParkingSpotEntity,
        (parkingSpots) => parkingSpots.parkingLot
    )
    parkingSpots?: ParkingSpotEntity[];

    @OneToMany(
        () => ParkingRateEntity,
        (parkingRates) => parkingRates.parkingLot
    )
    parkingRates?: ParkingRateEntity[];
}
