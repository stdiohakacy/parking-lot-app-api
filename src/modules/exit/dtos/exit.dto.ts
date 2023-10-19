import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../core/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ExitDTO extends BaseDTO {
    @ApiProperty({
        name: 'name',
        description: 'Name of exit',
        example: 'Exit 01',
        nullable: false,
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;

    @ApiProperty({
        name: 'parkingLotId',
        description: 'parking lot id of exit',
        example: faker.string.uuid(),
        nullable: false,
        required: true,
        type: String,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
