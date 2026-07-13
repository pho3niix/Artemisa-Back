import { SubscriptionPlans, ISubscriptionPlans } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';
import AuthServices from '../../../../Services/Auth.services';
import Validations from '../../../../Utils/ValidationError.util';
import jwt from 'jsonwebtoken';
import IndexServices from '../../../../Services/Index.services';
import { IBase } from './subscription.queries'

class Controllers {
    constructor() { }

    public async CreateSubscriptionPlan(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity
        }: IBase = req.body;

        const {
            Lang
        } = res.locals;

        const Plan = await SubscriptionPlans.GetPlanByCode({ Code });

        if (Plan) return next(new MyError(409, Messages.SubscriptionPlans.planExist[Lang]));

        const NewPlan = await SubscriptionPlans.CreateSubscriptionPlan({
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity
        });

        return res.status(200).json({
            message: Messages.SubscriptionPlans.created[Lang],
            status: true,
            results: NewPlan
        })
    }

    public async UpdatePlanById(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals

        const {
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity
        } = req.body;

        const {
            PlanId
        } = req.params;

        const Plan = await SubscriptionPlans.GetPlanById({ PlanId });

        if (!Plan) return next(new MyError(404, Messages.SubscriptionPlans.getById.notFound[Lang]))

        const NewPlan = await SubscriptionPlans.UpdatePlanById({
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity,
            PlanId
        })

        return res.status(200).json({
            message: Messages.SubscriptionPlans.update[Lang],
            status: true,
            results: NewPlan
        })
    }

}

export default new Controllers();