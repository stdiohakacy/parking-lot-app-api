import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from 'src/health/health.module';
import { HealthPublicController } from 'src/health/controllers/health.public.controller';
import { MessagePublicController } from 'src/core/message/controllers/message.public.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { ParkingLotModule } from 'src/modules/parking-lot/parking-lot.module';
import { ParkingLotPublicController } from 'src/modules/parking-lot/controllers/parking-lot.public.controller';
import { ParkingSpotModule } from 'src/modules/parking-spot/parking-spot.module';
import { ParkingSpotPublicController } from 'src/modules/parking-spot/controllers/parking-spot.public.controller';

@Module({
    imports: [
        CqrsModule,
        UserModule,
        TerminusModule,
        HealthModule,
        UserModule,
        ParkingLotModule,
        ParkingSpotModule,
    ],
    controllers: [
        HealthPublicController,
        MessagePublicController,
        UserPublicController,
        ParkingLotPublicController,
        ParkingSpotPublicController,
    ],
    providers: [],
    exports: [],
})
export class RoutesPublicModule {}
