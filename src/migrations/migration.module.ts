import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from 'src/core/api-key/api-key.module';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { CommonModule } from 'src/core/common.module';
import { ParkingLotModule } from 'src/modules/parking-lot/parking-lot.module';
import { MigrationParkingLotSeed } from './seeds/migration.parking-lot.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        ApiKeyModule,
        AuthCoreModule,
        ParkingLotModule,
        TypeOrmModule.forFeature([ParkingLotEntity]),
    ],
    providers: [MigrationParkingLotSeed],
    exports: [],
})
export class MigrationModule {}
