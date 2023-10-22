import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingLotService } from 'src/modules/parking-lot/services/parking-lot.service';
import { ENUM_PARKING_SPOT_TYPE } from 'src/modules/parking-spot/constants/parking-spot.enum.constant';
import { ParkingSpotService } from 'src/modules/parking-spot/services/parking-spot.service';

@Injectable()
export class MigrationParkingSpotSeed {
    constructor(
        private readonly parkingLotService: ParkingLotService,
        private readonly parkingSpotService: ParkingSpotService
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

            await this.parkingSpotService.create(parkingSpots);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:parkingSpot', describe: 'remove parking spot' })
    async remove(): Promise<void> {
        try {
            const parkingSpots = await this.parkingSpotService.findAll();
            const parkingSpotIds = parkingSpots.map(
                (parkingSpot) => parkingSpot.id
            );

            await this.parkingSpotService.remove(parkingSpotIds);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
