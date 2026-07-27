import { Users, Sessions, ISessions } from '../Api/00_Index/Index.models';
import MyError from './Error.mw';
import { Response, Request, NextFunction } from 'express';
import UtilMessages from '../Utils/ValidationError.util';
import Services from '../Services/Index.services';
import Messages from '../Api/00_Index/Index.messages';
import jwt from 'jsonwebtoken';
import Crypto from 'crypto';
import { readFileSync } from 'fs';

/**@Required - Actualizar interface al agregar variables a los locales de Response */
declare module 'express' {
    export interface Response {
        locals: {
            OwnId: string;
            SessionToken: string;
            SessionId: string;
            Lang: 'sp' | 'en';
        }
    }
}

const RefreshTime: number = 30;

async function VerifyExpireToken(Session: ISessions) {
    const Current = new Date();
    const Expires = new Date(Session.ExpiresAt);

    if ((Current > Expires)) {
        await Sessions.LogOut({ SessionId: Session.SessionId })
    }

    return Current > Expires;
}

export const CheckSession = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        cookie
    } = req.headers;

    const {
        Lang
    } = res.locals;

    if (!cookie) return next(new MyError(401, UtilMessages.Middleware.undefinedToken[Lang]));

    const Bearer = cookie.split('=')[1];

    const TokenData: any = jwt.verify(Bearer, process.env.JWT_SECRET);

    if (!TokenData) return next(new MyError(401, Messages.Auth.session.verifySession[Lang]));

    const DecodeHashData = Services.DecryptObject(TokenData.hash);

    const User = await Users.VerifyUserById({ UserId: DecodeHashData.UserId });

    if (!User) return next(new MyError(401, Messages.Auth.login.invalidCredentials[Lang]));

    if (!User.PlatformAccess) return next(new MyError(401, Messages.Auth.signup.platformAccessFalse[Lang]));

    const Session = await Sessions.VerifySession({ SessionId: DecodeHashData.SessionId });

    if (!Session) return next(new MyError(401, Messages.Auth.session.verifySession[Lang]));

    const Expires = await VerifyExpireToken(Session);

    if (Expires) return next(new MyError(401, Messages.Auth.session.expired[Lang]));

    await Sessions.RefreshToken({
        SessionId: DecodeHashData.SessionId,
        Expiration: RefreshTime
    });

    res.locals.OwnId = DecodeHashData.UserId;
    res.locals.SessionToken = Bearer;
    res.locals.SessionId = DecodeHashData.SessionId;

    return next();
}