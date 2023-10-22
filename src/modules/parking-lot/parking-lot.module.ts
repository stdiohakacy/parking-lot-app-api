import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotService } from './services/parking-lot.service';
import { ParkingLotEntity } from './entities/parking-lot.entity';
@Module({
    imports: [TypeOrmModule.forFeature([ParkingLotEntity])],
    providers: [ParkingLotService],
    exports: [ParkingLotService],
})
export class ParkingLotModule {}
