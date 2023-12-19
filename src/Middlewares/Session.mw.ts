// import { Users, Sessions, ISessions } from '../Api/00_Index/Index.models';
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

// async function VerifyExpireToken(Session: ISessions) {
//     const Current = new Date();
//     const Expires = new Date(Session.tExpiresAt);

//     if ((Current > Expires)) {
//         await Sessions.LogOutBySessionId({ sSessionId: Session.sSessionId })
//     }

//     return Current > Expires;
// }

export const CheckSession = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        authorization
    } = req.headers;

    const {
        Lang
    } = res.locals;

    if (!authorization) return next(new MyError(401, UtilMessages.Middleware.undefinedToken[Lang]));

    const Bearer = authorization.split(' ')[1];

    const TokenData: any = jwt.verify(Bearer, process.env.JWT_SECRET);

    if (!TokenData) return next(new MyError(401, Messages.Auth.session.verifySession[Lang]));

    const DecodeHashData = Services.DecryptObject(TokenData.hash);

    // const User = await Users.VerifyUserById({ sUserId: DecodeHashData.sUserId });

    // if (!User) return next(new MyError(401, Messages.auth.login.invalidCredentials[Lang]));

    // if (!User.bPlatformAccess) return next(new MyError(401, Messages.auth.signup.platformAccessFalse[Lang]));

    // const Session = await Sessions.VerifySession({ sSessionId: DecodeHashData.sSessionId });

    // if (!Session) return next(new MyError(401, Messages.auth.session.verifySession[Lang]));

    // const Expires = await VerifyExpireToken(Session);

    // if (Expires) return next(new MyError(401, Messages.auth.session.expired[Lang]));

    // await Sessions.RefreshToken({
    //     sSessionId: DecodeHashData.sSessionId,
    //     iMinutesExpiration: RefreshTime
    // });

    // res.locals.sOwnId = DecodeHashData.sUserId;
    // res.locals.sSessionToken = Bearer;
    // res.locals.sSessionId = DecodeHashData.sSessionId;

    return next();
}