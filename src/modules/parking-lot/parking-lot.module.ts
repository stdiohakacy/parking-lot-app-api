import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { EmailModule } from '../email/email.module';
import { StorageModule } from '../storages/storage.module';
import { ParkingLotEntity } from './entities/parking-lot.entity';
import { ParkingLotService } from './services/parking-lot.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingLotEntity]),
        AuthCoreModule,
        EmailModule,
        StorageModule,
    ],
    providers: [ParkingLotService],
    controllers: [],
    exports: [ParkingLotService],
})
export class ParkingLotModule {}