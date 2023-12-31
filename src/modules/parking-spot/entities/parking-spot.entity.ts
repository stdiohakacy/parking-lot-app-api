import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingSpotDTO } from '../dtos/parking-spot.dto';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';
import { ParkingSpotVehicleEntity } from './parking-spot-vehicle.entity';

export interface IParkingSpotEntity extends IBaseEntity<ParkingSpotDTO> {
    parkingSpotType: ENUM_PARKING_SPOT_TYPE;
    isFree: boolean;
}

@Entity({ name: 'parking_spots' })
@UseDTO(ParkingSpotDTO)
export class ParkingSpotEntity
    extends BaseEntity<ParkingSpotDTO>
    implements IParkingSpotEntity
{
    @Column({ name: 'parkingSpotType' })
    parkingSpotType: ENUM_PARKING_SPOT_TYPE;

    @Column({ name: 'isFree' })
    isFree: boolean;

    @Column({ name: 'parkingLotId', type: 'uuid', nullable: true })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;

    @OneToMany(
        () => ParkingSpotVehicleEntity,
        (parkingSpotVehicles) => parkingSpotVehicles.parkingSpot
    )
    parkingSpotVehicles?: ParkingSpotVehicleEntity[];

    spotUsed() {
        this.isFree = false;
        return this;
    }
}
