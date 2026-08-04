import { Users, Principals, IPrincipals, Plans } from '../../../00_Index/Index.models';
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
        } = res.locals;

        
        const Principal = await Principals.GetPrincipalById({ PrincipalId });

        if (!Principal) return next(new MyError(404, Messages['Users']['getById']['notFound'][Lang]));

        const Plan = await Plans.GetPlanByPrincipal({ PrincipalId });

        if(!Plan) return next(new MyError(404, Messages.SubscriptionPlans.getById.notFound[Lang]));

        return res.status(200).json({
            message: Messages.SubscriptionPlans.getById.success[Lang],
            results: Plan
        })
    }
}

export default new Controllers();