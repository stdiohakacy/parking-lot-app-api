import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceEntity } from './entities/entrance.entity';
import { EntranceService } from './services/entrance.service';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([EntranceEntity, ParkingLotEntity]),
        ParkingLotModule,
    ],
    providers: [EntranceService],
    exports: [EntranceService],
})
export class EntranceModule {}
