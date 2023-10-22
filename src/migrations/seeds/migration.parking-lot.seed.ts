import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingLotService } from 'src/modules/parking-lot/services/parking-lot.service';

@Injectable()
export class MigrationParkingLotSeed {
    constructor(private readonly parkingLotService: ParkingLotService) {}

    @Command({ command: 'seed:parkingLot', describe: 'seeds parking lot' })
    async seeds(): Promise<void> {
        try {
            await this.parkingLotService.create({
                name: 'Parking lot 01',
                address: '01 Nguyen Hue',
                capacity: 40000,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:parkingLot', describe: 'remove parking lot' })
    async remove(): Promise<void> {
        try {
            const parkingLots = await this.parkingLotService.findAll();
            const parkingLotIds = parkingLots.map(
                (parkingLot) => parkingLot.id
            );

            await this.parkingLotService.remove(parkingLotIds);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
