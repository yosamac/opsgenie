import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe {
    private readonly schema: ObjectSchema;

    constructor(schema) {
        const unknownValidation =
            process.env.SCHEMA_UNKNOWN_VALIDATION?.toLowerCase() != 'false';
        this.schema =
            !unknownValidation && typeof schema.unknown === 'function' ?
                schema.unknown(true) :
                schema;
    }

    transform(value, _metadata) {
        const { error } = this.schema.validate(value);

        if (error) {
            throw new HttpException(
                `${ error.message.replace(/"/g, '\'') }`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }
}
