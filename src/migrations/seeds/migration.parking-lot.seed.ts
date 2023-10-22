import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MigrationParkingLotSeed {
    constructor() {}

    @Command({ command: 'seed:parkingLot', describe: 'seeds parking lot' })
    async seeds(): Promise<void> {
        try {
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:parkingLot', describe: 'remove parking lot' })
    async remove(): Promise<void> {
        try {
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
