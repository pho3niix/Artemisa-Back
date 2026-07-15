import { Users, Sessions, ISessions } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';
import { ILogin } from './sessions.queries';
import AuthServices from '../../../../Services/Auth.services';
import Validations from '../../../../Utils/ValidationError.util';
import jwt from 'jsonwebtoken';
import IndexServices from '../../../../Services/Index.services';

class Controllers {
    constructor() { }

    public async Login(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            Email,
            Password
        }: ILogin = req.body;

        const User = await Users.GetUserByEmail({ Email });

        if (!User) return next(new MyError(403, Messages.Auth.login.invalidCredentials[Lang]));

        if (!User.PlatformAccess) return next(new MyError(403, Messages.Auth.login.invalidPlatformAccess[Lang]));

        if (!AuthServices.ComparePassword(Password, User.Password)) return next(new MyError(409, Messages.Auth.login.invalidCredentials[Lang]));

        const Session = await Sessions.CreateSession({
            UserId: User.UserId,
            Expiration: 30
        });

        const maxAge = 60 * 60 * 2; // 1 día en segundos
        
        const isProduction = process.env.NODE_ENV === "production";

        // Construimos el string del header Set-Cookie
        const cookieString = [
            `session=${Session}`,
            `Max-Age=${maxAge}`,
            `Path=/`,
            `HttpOnly`, // 🔒 Evita que JavaScript lea el token en el cliente
            `SameSite=Lax`,
            isProduction ? `Secure` : "" // Solo requiere HTTPS en producción
        ].filter(Boolean).join('; ');

        // Inyectamos la cabecera en la respuesta HTTP
        res.setHeader('Set-Cookie', cookieString);

        return res.status(200).json({
            message: Messages.Auth.login.welcome(User.FullName, Lang),
            status: true,
            results: {
                UserId: User.UserId,
                Token: Session,
                Email: User.Email,
                FullName: User.FullName
            }
        })
    }

    public async LogOut(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const Bearer = req.headers['authorization'];

        if (!Bearer) return next(new MyError(401, Validations.Middleware.undefinedToken[Lang]));

        const Payload: any = jwt.verify(Bearer.split(' ')[1], process.env.JWT_SECRET);

        const Data = IndexServices.DecryptObject(Payload.hash);

        const Session = await Sessions.VerifySession({ SessionId: Data.SessionId });

        if (!Session) return next(new MyError(401, Messages.Auth.session.sessionKilled[Lang]));

        await Sessions.LogOut({ SessionId: Session.SessionId });

        return res.status(200).json({
            message: Messages.Auth.session.success[Lang],
            status: true
        })
    }
}

export default new Controllers();