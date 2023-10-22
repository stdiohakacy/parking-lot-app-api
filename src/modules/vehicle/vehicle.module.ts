import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleService } from './services/vehicle.service';
@Module({
    imports: [TypeOrmModule.forFeature([VehicleEntity])],
    providers: [VehicleService],
    exports: [VehicleService],
})
export class VehicleModule {}
