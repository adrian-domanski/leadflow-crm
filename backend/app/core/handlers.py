from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions import (
    AppException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
)


def not_found_handler(request: Request, exc: NotFoundException):
    return JSONResponse(status_code=404, content={"error": "not_found", "message": exc.message})


def forbidden_handler(request: Request, exc: ForbiddenException):
    return JSONResponse(status_code=403, content={"error": "forbidden", "message": exc.message})


def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(status_code=400, content={"error": "bad_request", "message": exc.message})


def conflict_exception_handler(request: Request, exc: AppException):
    return JSONResponse(status_code=409, content={"error": "conflict", "message": exc.message})


def register_exception_handlers(app):
    app.add_exception_handler(NotFoundException, not_found_handler)
    app.add_exception_handler(ForbiddenException, forbidden_handler)
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(ConflictException, conflict_exception_handler)
