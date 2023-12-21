import { RecoveryToken, Authorization, Users } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';
import { ISave } from './auth.queries';
import AuthServices from '../../../../Services/Auth.services'

class Controllers {
    constructor() { }

    public async SignUp(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            Email,
            Password,
            PhoneNumber,
            Name,
            LastName,
            ConfirmPassword
        }: ISave = req.body;

        const User = await Users.GetUserByEmail({ Email });

        if (User) return next(new MyError(409, Messages.Auth.signup.userExist[Lang]));

        const ComparePassword = AuthServices.ConfirmPassword(Password, ConfirmPassword);

        if (ComparePassword) return next(new MyError(401, Messages.Auth.matchPasswords.dontMatch[Lang]));

        const NewUser = await Authorization.SignUp({
            Name,
            LastName,
            Email,
            PhoneNumber,
            Password
        });

        await RecoveryToken.CreateTokenByUser({ NewUser, Lang, Expiration: 15 });

        return res.status(200).json({
            message: Messages.Users.created[Lang],
            status: true,
            results: NewUser
        });
    }
}

export default new Controllers();