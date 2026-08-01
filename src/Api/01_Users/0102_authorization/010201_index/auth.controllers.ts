import { Authorization, Users, RecoveryToken } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';
import { ISave } from './auth.queries';
import AuthServices from '../../../../Services/Auth.services'
import IndexServices from '../../../../Services/Index.services';
import cron from 'node-cron';

class Controllers {
    constructor() { }

    public async SignUp(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            Email,
            PhoneNumber,
            Name,
            LastName,
            PlanId
        }: ISave = req.body;

        const User = await Users.GetUserByEmail({ Email });

        if (User) return next(new MyError(409, Messages.Auth.signup.userExist[Lang]));

        const NewUser = await Authorization.SignUp({
            Name,
            LastName,
            Email,
            PhoneNumber,
            PlanId
        });

        await Users.CreatePrincipal({ PrincipalId: NewUser.UserId, PlanId });

        await RecoveryToken.SendRecoveryToken({ User: NewUser, Lang: 'sp', Expiration: 15 });

        return res.status(200).json({
            message: Messages.Users.created[Lang],
            results: NewUser
        });
    }

    public async VerifyUser(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId
        } = req.params;

        const User = await Users.GetUserById({ UserId });

        if (!User) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        await Users.ChangePlatformAccess({ UserId, Access: true });

        return res.redirect(process.env.HOME_PAGE)
    }
}

export default new Controllers();