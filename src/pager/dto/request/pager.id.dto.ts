import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export class PagerIdDTO {
    @ApiProperty()
    readonly id: string;
}

export const PagerIdSchema = Joi.object({
    id: Joi.string().required(),
});

export const PagerIdPipe = new JoiValidationPipe(PagerIdSchema);