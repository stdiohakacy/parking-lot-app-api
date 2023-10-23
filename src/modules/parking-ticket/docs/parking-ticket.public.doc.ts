import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../core/doc/constants/doc.enum.constant';
import {
    Doc,
    DocRequest,
    DocResponse,
} from '../../../core/doc/decorators/doc.decorator';
import { ParkingTicketScanTicketSerialization } from '../serializations/parking-ticket.scan-ticket.serialization';
import { ParkingTicketDocParamsId } from '../constants/parking-ticket.doc.constant';

export function ParkingTicketPublicTakeTicketDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.parking-ticket' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('parkingTicket.takeTicket', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function ParkingTicketPublicScanTicketDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.parkingTickets' }),
        DocRequest({ params: ParkingTicketDocParamsId }),
        DocResponse<ParkingTicketScanTicketSerialization>(
            'parkingTicket.scanTicket',
            {
                serialization: ParkingTicketScanTicketSerialization,
            }
        )
    );
}
