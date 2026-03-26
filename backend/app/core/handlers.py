from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

from app.core.exceptions import (
    AppException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
)


CUSTOM_MESSAGES = {
    "value_error.email": "Invalid email format",
    "value_error.missing": "This field is required",
    "type_error.none.not_allowed": "This field cannot be null",
}


def format_validation_errors(exc):
    errors = {}

    for err in exc.errors():
        field = err["loc"][-1]  # np. "email"
        error_type = err.get("type")
        message = CUSTOM_MESSAGES.get(error_type, err.get("msg"))

        errors[field] = message

    return errors


def not_found_handler(request: Request, exc: NotFoundException):
    return JSONResponse(
        status_code=404,
        content={
            "error": "not_found",
            "message": exc.message,
        },
    )


def forbidden_handler(request: Request, exc: ForbiddenException):
    return JSONResponse(
        status_code=403,
        content={
            "error": "forbidden",
            "message": exc.message,
        },
    )


def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=400,
        content={
            "error": "bad_request",
            "message": exc.message,
        },
    )


def conflict_exception_handler(request: Request, exc: ConflictException):
    return JSONResponse(
        status_code=409,
        content={
            "error": "conflict",
            "message": exc.message,
        },
    )


def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": "validation_error",
            "fields": format_validation_errors(exc),
        },
    )


def request_validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": "validation_error",
            "fields": format_validation_errors(exc),
        },
    )


def register_exception_handlers(app):
    app.add_exception_handler(NotFoundException, not_found_handler)
    app.add_exception_handler(ForbiddenException, forbidden_handler)
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(ConflictException, conflict_exception_handler)
    app.add_exception_handler(RequestValidationError, request_validation_exception_handler)
    app.add_exception_handler(ValidationError, validation_exception_handler)
