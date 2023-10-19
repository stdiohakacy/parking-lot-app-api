import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ParkingLotEntity } from '../parking-lot/entities/parking-lot.entity';
import { ExitEntity } from './entities/exit.entity';
import { ExitService } from './services/exit.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([ExitEntity, ParkingLotEntity]),
        ParkingLotModule,
    ],
    providers: [ExitService],
    exports: [ExitService],
})
export class ExitModule {}
