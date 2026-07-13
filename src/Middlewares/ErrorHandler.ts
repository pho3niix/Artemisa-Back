import MyError from './Error.mw';
import {
    // Secure Errors
    AggregateError, AssociationError, BaseError, BulkRecordError, ConnectionError, DatabaseError, EagerLoadingError, EmptyResultError, InstanceError, OptimisticLockError, QueryError, SequelizeScopeError, ValidationError,
    // Connection Errors
    AccessDeniedError, ConnectionAcquireTimeoutError, ConnectionRefusedError, ConnectionTimedOutError, HostNotFoundError, HostNotReachableError, InvalidConnectionError,
    // Database errors
    ExclusionConstraintError, ForeignKeyConstraintError, TimeoutError, UnknownConstraintError,
    // Validation Errors
    UniqueConstraintError
} from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { IMyError } from "./SendAsJson.mw";
import Messages from "../Utils/ValidationError.util";

interface IErrHandler extends IMyError {
    type: string
}

export default () => async (err: IErrHandler, req: Request, res: Response, next: NextFunction) => {
    const { Lang } = res.locals;
    if (err.hasOwnProperty("joi")) {
        err.type = "JoiValidationError";
    }
    console.log(
        "———————————————————————————————————————————————————————————————————————————"
    );
    if (err.name === "CustomError") {
        console.log(err);
        let {
            Password,
            NewPassword,
            ConfirmNewPassword,
            ConfirmPassword
        } = req.body;
        let { Token } = req.query;
        let body = { ...req.body };
        let queries = { ...req.query };

        if (Password) body.Password = "*********";
        if (NewPassword) body.NewPassword = "*********";
        if (ConfirmNewPassword) body.ConfirmNewPassword = "*********";
        if (ConfirmPassword) body.ConfirmPassword = "*********";
        if (Token) queries.Token = "*********";

        console.log({
            body: body,
            params: req.params,
            query: req.query,
        });
        return next(err);
    }

    // Secure errors
    if (err instanceof AggregateError) {
        console.error("Entra en AggregateError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof AssociationError) {
        console.error("Entra en AssociationError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof BaseError) {
        console.error("Entra en BaseError");
        return next(new MyError(400, err.message))
    }
    else if (err instanceof BulkRecordError) {
        console.log("Entra en BulkRecordError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof ConnectionError) {
        console.log("Entra en ConnectionError")
        return next(new MyError(503, err.message))
    }
    else if (err instanceof DatabaseError) {
        console.log("Entra en DatabaseError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof EagerLoadingError) {
        console.log("Entra en EagerLoadingError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof EmptyResultError) {
        console.log("Entra en EmptyResultError")
        return next(new MyError(404, err.message))
    }
    else if (err instanceof InstanceError) {
        console.log("Entra en InstanceError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof OptimisticLockError) {
        console.log("Entra en OptimisticLockError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof QueryError) {
        console.log("Entra en QueryError")
        return next(new MyError(409, err.message))
    }
    else if (err instanceof SequelizeScopeError) {
        console.log("Entra en SequelizeScopeError")
        return next(new MyError(400, err.message))
    }
    else if (err instanceof ValidationError) {
        console.log("Entra en ValidationError")
        return next(new MyError(400, err.message))
    }

    // Connection errors
    else if (err instanceof AccessDeniedError) {
        return next(new MyError(403, err.message))
    }
    else if (err instanceof ConnectionAcquireTimeoutError) {
        return next(new MyError(503, err.message))
    }
    else if (err instanceof ConnectionRefusedError) {
        return next(new MyError(401, err.message))
    }
    else if (err instanceof ConnectionTimedOutError) {
        return next(new MyError(503, err.message))
    }
    else if (err instanceof HostNotFoundError) {
        return next(new MyError(503, err.message))
    }
    else if (err instanceof HostNotReachableError) {
        return next(new MyError(503, err.message))
    }
    else if (err instanceof InvalidConnectionError) {
        return next(new MyError(503, err.message))
    }

    // Database Errors
    else if (err instanceof ExclusionConstraintError) {
        return next(new MyError(400, err.message))
    }
    else if (err instanceof ForeignKeyConstraintError) {
        return next(new MyError(400, err.message))
    }
    else if (err instanceof TimeoutError) {
        return next(new MyError(503, err.message))
    }
    else if (err instanceof UniqueConstraintError) {
        return next(new MyError(400, err.message))
    }
    else if (err instanceof UnknownConstraintError) {
        return next(new MyError(400, err.message))
    }

    // JWT errors
    else if (err.name === "JsonWebTokenError") {
        return next(new MyError(401, "Token de sesión inválido"));
    }
    else if (err.type === "JoiValidationError") {
        console.log("JOIVALIDATIONERROR");
        if (err.message.includes("allowed")) {
            return next(new MyError(409, err.message))
        }
        else {
            const [langCode, type, message] = [
                `${Lang ? Lang : 'sp'}`,
                err.message.split(" ")[0],
                err.message.split(" ")[1],
            ];
            return next(new MyError(409, Messages[err.type][type][message][langCode]))
        }
    }
    else {
        return next(new MyError(500, err.message))
    }
}