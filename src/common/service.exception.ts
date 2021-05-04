import { HttpStatus, HttpException } from '@nestjs/common';

const errorMapper = {
    3: HttpStatus.BAD_REQUEST,
    5: HttpStatus.NOT_FOUND,
    6: HttpStatus.CONFLICT,
    7: HttpStatus.FORBIDDEN,
    12: HttpStatus.NOT_IMPLEMENTED,
    14: HttpStatus.SERVICE_UNAVAILABLE,
    16: HttpStatus.UNAUTHORIZED,
};

// This kind of errors correspond to gRPC status response codes.
// Primarily for convenience
export enum ServiceExceptionStatus {
    INVALID_ARGUMENT = 3, // 400
    NOT_FOUND = 5, // 404
    ALREADY_EXISTS = 6, // 409
    PERMISSION_DENIED = 7, // 403
    UNIMPLEMENTED = 12, // 501
    INTERNAL = 13, // 500
    UNAVAILABLE = 14, // 503
    UNAUTHENTICATED = 16, // 401
    BAD_CREDENTIALS = 16
}

export class ServiceException extends HttpException {
    constructor(status: ServiceExceptionStatus, private msg: string) {
        super(msg, ServiceException.mapHttpStatus(status));
    }

    getMessage(): string {
        return this.msg;
    }

    static mapHttpStatus(status): HttpStatus {
        return errorMapper[status] ||HttpStatus.INTERNAL_SERVER_ERROR;
    }
}