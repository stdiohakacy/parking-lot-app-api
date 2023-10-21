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

            const parkingSpotTypes = [
                ENUM_PARKING_SPOT_TYPE.LARGE,
                ENUM_PARKING_SPOT_TYPE.COMPACT,
                ENUM_PARKING_SPOT_TYPE.HANDICAPPED,
                ENUM_PARKING_SPOT_TYPE.MOTORCYCLE,
            ];

            const parkingSpots = parkingSpotTypes.reduce((spots, type) => {
                const parkingSpotArray = Array.from({ length: 10 }).map(() => ({
                    isFree: true,
                    parkingSpotType: type,
                    parkingLotId: parkingLot.id,
                }));
                return spots.concat(parkingSpotArray);
            }, []);

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
