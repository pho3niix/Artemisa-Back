import { Users, IUsers, RecoveryToken, IRecoveryToken } from '../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../00_Index/Index.middlewares';
import Messages from '../../00_Index/Index.messages';
import { IUpdate, IUserId } from './users.queries';

class Controllers {
    constructor() { }

    public async UpdateUserById(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId
        }: IUserId = req.params;

        const {
            Name,
            LastName,
            PhoneNumber
        }: IUpdate = req.body;

        const User = await Users.GetUserById({ UserId });

        if (!User) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const NewUser = await Users.UpdateUserById({
            UserId,
            Name,
            LastName,
            PhoneNumber
        });

        return res.status(200).json({
            message: Messages.Users.update[Lang],
            results: NewUser
        })
    }

    public async GetProfileById(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId
        }: IUserId = req.params;

        const User = await Users.GetUserById({ UserId });

        if (!User) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        return res.status(200).json({
            message: Messages.Users.getById.success[Lang],
            results: User
        })
    }
}

export default new Controllers();