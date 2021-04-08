import { ValidationError as _ValidationError } from 'class-validator';
import { StatusCode } from '../status/statusCode';

interface IProps {
    statusCode?: StatusCode;
    message?: string;
}

abstract class ServiceError extends Error {
    public statusCode: StatusCode;
    public message: string;

    constructor(props: IProps) {
        super(props.message);
        Object.assign(this, props);
    }
}

class NotFoundError extends ServiceError {
    constructor(message: string) {
        super({
            statusCode: StatusCode.NOT_FOUND,
            message,
        });
    }
}

class BadRequestError extends ServiceError {
    constructor(message: string) {
        super({
            statusCode: StatusCode.BAD_REQUEST,
            message,
        });
    }
}

class ConflictError extends ServiceError {
    constructor(message: string) {
        super({
            statusCode: StatusCode.CONFLICT,
            message,
        });
    }
}

class UnauthorizedError extends ServiceError {
    constructor(message: string) {
        super({
            statusCode: StatusCode.UNAUTHORIZED,
            message,
        });
    }
}

class ValidationError extends ServiceError {
    public errors: Object[];

    constructor(errors: _ValidationError[]) {
        super({
            statusCode: StatusCode.BAD_REQUEST,
            message: 'Erro de validação',
        });

        this.errors = errors.map(error => {
            const messages: string[] = [];

            if (error.constraints)
                Object.values(error.constraints).forEach(value =>
                    messages.push(value)
                );

            return {
                property: error.property,
                messages,
            };
        });
    }
}

export {
    ServiceError,
    NotFoundError,
    ConflictError,
    BadRequestError,
    UnauthorizedError,
    ValidationError,
};
