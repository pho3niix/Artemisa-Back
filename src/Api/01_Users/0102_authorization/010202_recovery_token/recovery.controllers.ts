import { Users, IUsers, RecoveryToken, Sessions } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';
import IndexServices from '../../../../Services/Index.services';
import AuthServices from '../../../../Services/Auth.services';

class Controllers {
    constructor() { }

    public async SendRecoveryToken(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            Email
        }: {
            Email: IUsers['Email']
        } = req.body;

        const User = await Users.GetUserByEmail({ Email });

        if (User) await RecoveryToken.SendRecoveryToken({ User, Lang, Expiration: 15 });

        return res.status(200).json({
            message: Messages.RecoveryPasswords.success[Lang],
            results: {}
        })
    }

    public async SetPasswordByToken(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            NewPassword,
            ConfirmNewPassword
        } = req.body;

        const {
            Token
        } = req.query;

        const QueryToken = await RecoveryToken.GetTokenBy({ Token: Token as string });

        if (!QueryToken) return next(new MyError(404, Messages.RecoveryPasswords.tokenNotExists[Lang]));

        const [ExpiresAt, CurrentDate] = [IndexServices.GetTime(QueryToken.ExpiresAt), IndexServices.GetTime(new Date())];

        if (CurrentDate > ExpiresAt) return next(new MyError(401, Messages.RecoveryPasswords.expireToken[Lang]));

        if (AuthServices.ConfirmPassword(NewPassword, ConfirmNewPassword)) return next(new MyError(409, Messages.Auth.matchPasswords.dontMatch[Lang]));

        await Users.SetPasswordByUserId({ UserId: QueryToken.UserId, Password: NewPassword });

        await Sessions.DeleteAllSessionsByUser({ UserId: QueryToken.UserId });

        await RecoveryToken.DeleteAllTokenByUserId({ UserId: QueryToken.UserId })

        return res.status(200).json({
            message: Messages.RecoveryPasswords.passwordChanged[Lang],
            results: {
                redirect: process.env.HOME_PAGE
            }
        })
    }
}

export default new Controllers();