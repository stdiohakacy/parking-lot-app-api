import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { ExitDTO } from '../dtos/exit.dto';

export interface IExitEntity extends IBaseEntity<ExitDTO> {
    name: string;
}

@Entity({ name: 'exits' })
@UseDTO(ExitDTO)
export class ExitEntity extends BaseEntity<ExitDTO> implements IExitEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'parkingLotId', type: 'uuid' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot: ParkingLotEntity;
}
