import { Users, Principals, IPrincipals, SubscriptionPlans } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';

class Controllers {
    constructor() { }

    async GetPlanByPrincipal(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            PrincipalId
        } = req.params;

        const {
            Lang
        } = res.locals

        const Principal = await Principals.GetPrincipalById({ PrincipalId });
        
        console.log("here ========================>")

        if (!Principal) return next(new MyError(404, Messages['Users']['getById']['notFound'][Lang]));

        const Plans = await SubscriptionPlans.GetPlanByPrincipal({ PrincipalId });

        return res.status(200).json({
            message: Messages.SubscriptionPlans.getById.success[Lang],
            results: Plans
        })
    }
}

export default new Controllers();