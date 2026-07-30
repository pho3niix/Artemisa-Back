import MyError from './Error.mw';
import { Response, Request, NextFunction } from 'express';
import UtilMessage from '../Utils/ValidationError.util';
import Messages from '../Api/00_Index/Index.messages';
import JWT from 'jsonwebtoken';
import Services from '../Services/Index.services';

export const OnlySuperAdmin = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        Lang
    } = res.locals;

    const {
        cookie
    } = req.headers;

    if (!cookie) return next(new MyError(401, UtilMessage.Middleware.undefinedToken[Lang]));

    const Bearer = cookie.split('=')[1];

    const Verify: any = JWT.verify(Bearer, process.env.JWT_SECRET);

    const TokenData = Services.DecryptObject(Verify.hash);

    // const Admin = await Users.GetUserById({ UserId: TokenData.UserId });

    // if (!Admin) return next(new MyError(403, UtilMessage.Middleware.accessDenied[Lang]));

    return next();
}

export const OnlyDevTeam = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        Lang
    } = res.locals;

    const api_key = req.headers['x-api-key'];

    console.log(api_key);

    if (!api_key) return next(new MyError(401, UtilMessage.Middleware.undefinedToken[Lang]));

    if (process.env.SECRET_DEV_KEY != api_key) return next(new MyError(403, UtilMessage.Middleware.accessDenied[Lang]));

    return next();
}

export const OwnUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        Lang
    } = res.locals;

    const {
        cookie
    } = req.headers;

    const {
        UserId
    } = req.params

    if (!cookie) return next(new MyError(401, UtilMessage.Middleware.undefinedToken[Lang]));

    const Bearer = cookie.split('=')[1];

    const Verify: any = JWT.verify(Bearer, process.env.JWT_SECRET);

    const TokenData = Services.DecryptObject(Verify.hash);

    if (TokenData.UserId != UserId) return next(new MyError(403, UtilMessage.Middleware.accessDenied[Lang]));

    return next();
}

export const NotOwnUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        Lang
    } = res.locals;

    const {
        cookie
    } = req.headers;

    const {
        UserId
    } = req.params;

    if (!cookie) return next(new MyError(401, UtilMessage.Middleware.undefinedToken[Lang]));

    const Bearer = cookie.split('=')[1];

    const Verify: any = JWT.verify(Bearer, process.env.JWT_SECRET);

    const TokenData = Services.DecryptObject(Verify.hash);

    if (TokenData.UserId == UserId) return next(new MyError(403, UtilMessage.Middleware.accessDenied[Lang]));

    return next();
}