import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MigrationParkingSpotSeed {
    constructor() {}

    @Command({ command: 'seed:parkingSpot', describe: 'seeds parking spot' })
    async seeds(): Promise<void> {
        try {
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:parkingSpot', describe: 'remove parking spot' })
    async remove(): Promise<void> {
        try {
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
