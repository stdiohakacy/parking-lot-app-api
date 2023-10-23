import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('common.public.parking-lots')
@Controller({ version: VERSION_NEUTRAL, path: '/parking-lots' })
export class ParkingLotPublicController {}
