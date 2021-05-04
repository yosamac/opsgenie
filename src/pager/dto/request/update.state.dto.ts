import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export enum State {
    HEALTHY = 'HEALTHY',
    UNHEALTHY = 'UNHEALTHY'
}

const validOptions = Object.keys(State);

export class UpdateStateDto {
    @ApiProperty({ required: true, enum: State })
    readonly state: State;
}

export const UpdateStateSchema = Joi.object({
    id: Joi.string().required()
        .label('id').description('Pager Service Id'),
    state: Joi.string().optional().valid(...validOptions).uppercase()
        .label('state').description('Monitored Service State'),
});

export const UpdateStatePipe =
    new JoiValidationPipe(UpdateStateSchema);