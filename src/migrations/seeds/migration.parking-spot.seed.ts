import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingLotService } from 'src/modules/parking-lot/services/parking-lot.service';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLotEntity } from 'src/modules/parking-lot/entities/parking-lot.entity';
import { ParkingSpotService } from 'src/modules/parking-spot/services/parking-spot.service';
import { ParkingSpotEntity } from 'src/modules/parking-spot/entities/parking-spot.entity';
import { ENUM_PARKING_SPOT_TYPE } from 'src/modules/parking-spot/constants/parking-spot.enum.constant';

@Injectable()
export class MigrationParkingSpotSeed {
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>,
        private readonly parkingSpotService: ParkingSpotService,
        private readonly parkingLotService: ParkingLotService
    ) {}

    @Command({ command: 'seed:parkingSpot', describe: 'seeds parking spot' })
    async seeds(): Promise<void> {
        try {
            const parkingLot =
                await this.parkingLotService.getByName('Parking lot 01');

            const parkingSpotsLarge = Array.from({
                length: 10,
            }).map(() => ({
                isFree: true,
                parkingSpotType: ENUM_PARKING_SPOT_TYPE.LARGE,
                parkingLotId: parkingLot.id,
            }));

            const parkingSpotsCompact = Array.from({
                length: 10,
            }).map(() => ({
                isFree: true,
                parkingSpotType: ENUM_PARKING_SPOT_TYPE.COMPACT,
                parkingLotId: parkingLot.id,
            }));

            const parkingSpotsHandicapped = Array.from({
                length: 10,
            }).map(() => ({
                isFree: true,
                parkingSpotType: ENUM_PARKING_SPOT_TYPE.HANDICAPPED,
                parkingLotId: parkingLot.id,
            }));

            const parkingSpotsMotorcycle = Array.from({
                length: 10,
            }).map(() => ({
                isFree: true,
                parkingSpotType: ENUM_PARKING_SPOT_TYPE.MOTORCYCLE,
                parkingLotId: parkingLot.id,
            }));

            const parkingSpots = [
                ...parkingSpotsLarge,
                ...parkingSpotsCompact,
                ...parkingSpotsHandicapped,
                ...parkingSpotsMotorcycle,
            ];

            await this.parkingSpotService.createMany(parkingSpots);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:parkingSpot', describe: 'remove parking spot' })
    async remove(): Promise<void> {
        try {
            const parkingSpots = await this.parkingSpotRepo.find();
            const parkingSpotIds = parkingSpots.map(
                (parkingSpot) => parkingSpot.id
            );
            await this.parkingSpotService.remove(parkingSpotIds);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
