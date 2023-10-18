import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, IBaseEntity } from '../../../core/base/entity/base.entity';
import { UseDTO } from '../../../core/base/decorator/use-dto.decorator';
import { ParkingLotDTO } from '../dtos/parking-lot.dto';

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
}
