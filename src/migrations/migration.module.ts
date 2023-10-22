import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from 'src/core/api-key/api-key.module';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { CommonModule } from 'src/core/common.module';
import { MigrationParkingLotSeed } from './seeds/migration.parking-lot.seed';
import { MigrationParkingSpotSeed } from './seeds/migration.parking-spot.seed';
import { ParkingLotModule } from 'src/modules/parking-lot/parking-lot.module';
import { ParkingSpotModule } from 'src/modules/parking-spot/parking-spot.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        ApiKeyModule,
        AuthCoreModule,
        ParkingLotModule,
        ParkingSpotModule,
    ],
    providers: [MigrationParkingLotSeed, MigrationParkingSpotSeed],
    exports: [],
})
export class MigrationModule {}
