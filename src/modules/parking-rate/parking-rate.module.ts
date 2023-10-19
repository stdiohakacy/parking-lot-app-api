import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
import { ParkingRateEntity } from './entities/parking-rate.entity';
import { ParkingRateService } from './services/parking-rate.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingRateEntity, ParkingLotEntity]),
        ParkingLotModule,
    ],
    providers: [ParkingRateService],
    exports: [ParkingRateService],
})
export class ParkingRateModule {}
