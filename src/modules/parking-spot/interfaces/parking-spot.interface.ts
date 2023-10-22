import { ENUM_VEHICLE_TYPE } from 'src/modules/vehicle/constants/vehicle.enum.constant';

export interface IParkingSpot {
    parkVehicle(vehicle: ENUM_VEHICLE_TYPE);
}

export class HandicappedParkingSpot implements IParkingSpot {
    parkVehicle(vehicle: ENUM_VEHICLE_TYPE) {}
}

export class CompactParkingSpot implements IParkingSpot {
    parkVehicle(vehicle: ENUM_VEHICLE_TYPE) {}
}

export class LargeParkingSpot implements IParkingSpot {
    parkVehicle(vehicle: ENUM_VEHICLE_TYPE) {}
}

export class MotorcycleParkingSpot implements IParkingSpot {
    parkVehicle(vehicle: ENUM_VEHICLE_TYPE) {}
}
