import { Injectable } from '@nestjs/common';
import {
    CompactParkingSpot,
    HandicappedParkingSpot,
    IParkingSpot,
    LargeParkingSpot,
    MotorcycleParkingSpot,
} from '../interfaces/parking-spot.interface';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';

@Injectable()
export class ParkingSpotFactory {
    createParkingSpot(parkingSpotType: ENUM_PARKING_SPOT_TYPE): IParkingSpot {
        switch (parkingSpotType) {
            case ENUM_PARKING_SPOT_TYPE.HANDICAPPED:
                return new HandicappedParkingSpot();
            case ENUM_PARKING_SPOT_TYPE.COMPACT:
                return new CompactParkingSpot();
            case ENUM_PARKING_SPOT_TYPE.LARGE:
                return new LargeParkingSpot();
            case ENUM_PARKING_SPOT_TYPE.MOTORCYCLE:
                return new MotorcycleParkingSpot();
            default:
                throw new Error('Invalid parking spot type.');
        }
    }
}
