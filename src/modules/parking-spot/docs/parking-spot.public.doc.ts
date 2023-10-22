import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/core/doc/constants/doc.enum.constant';
import {
    Doc,
    DocRequest,
    DocResponse,
} from 'src/core/doc/decorators/doc.decorator';

export function ParkingSpotPublicCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.parking-spots' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('parkingSpot.create', { httpStatus: HttpStatus.CREATED })
    );
}

export function ParkingSpotPublicParkVehicleDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.parking-spots' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('parkingSpot.parkVehicle', {
            httpStatus: HttpStatus.OK,
        })
    );
}
