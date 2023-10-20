import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from 'src/core/api-key/api-key.module';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { CommonModule } from 'src/core/common.module';
import { ParkingLotModule } from 'src/modules/parking-lot/parking-lot.module';
import { MigrationParkingLotSeed } from './seeds/migration.parking-lot.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';
import { MigrationParkingSpotSeed } from './seeds/migration.parking-spot.seed';
import { ParkingSpotEntity } from 'src/modules/parking-spot/entities/parking-spot.entity';
import { ParkingSpotModule } from 'src/modules/parking-spot/parking-spot.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        ApiKeyModule,
        AuthCoreModule,
        ParkingLotModule,
        ParkingSpotModule,
        TypeOrmModule.forFeature([ParkingLotEntity, ParkingSpotEntity]),
    ],
    providers: [MigrationParkingLotSeed, MigrationParkingSpotSeed],
    exports: [],
})
export class MigrationModule {}
