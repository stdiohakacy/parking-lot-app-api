import { Injectable } from '@nestjs/common';
import { ParkingRateService } from '../services/parking-rate.service';

@Injectable()
export class MotorcycleParkingStrategy {
    constructor(private readonly parkingRateService: ParkingRateService) {}

    async calculateParkingFee(parkingDuration: number): Promise<number> {
        const parkingRate =
            await this.parkingRateService.getLatestParkingRate();
        return parkingDuration * parkingRate.rate;
    }
}

@Injectable()
export class CarParkingStrategy {
    constructor(private readonly parkingRateService: ParkingRateService) {}

    async calculateParkingFee(parkingDuration: number): Promise<number> {
        const parkingRate =
            await this.parkingRateService.getLatestParkingRate();
        return parkingDuration * (parkingRate.rate + 5);
    }
}

@Injectable()
export class VanParkingStrategy {
    constructor(private readonly parkingRateService: ParkingRateService) {}

    async calculateParkingFee(parkingDuration: number): Promise<number> {
        const parkingRate =
            await this.parkingRateService.getLatestParkingRate();
        return parkingDuration * (parkingRate.rate + 10);
    }
}

@Injectable()
export class TruckParkingStrategy {
    constructor(private readonly parkingRateService: ParkingRateService) {}

    async calculateParkingFee(parkingDuration: number): Promise<number> {
        const parkingRate =
            await this.parkingRateService.getLatestParkingRate();
        return parkingDuration * (parkingRate.rate + 15);
    }
}
