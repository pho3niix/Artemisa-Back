import { Users, Principals, IPrincipals, Plans, States, Branches } from '../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../00_Index/Index.middlewares';
import Messages from '../../00_Index/Index.messages';

class Controllers {
    constructor() { }

    public async CreateBranchByPrincipal(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PrincipalId,
            PhoneNumber
        } = req.body;

        const State = await States.GetStateById({ StateId });

        if (!State) return next(new MyError(404, Messages.Locations.States.get.byId.notFound[Lang]));

        const Principal = await Principals.GetPrincipalById({ PrincipalId });

        if (!Principal) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const BranchesByPrincipalId = await Branches.GetBranchesByPrincipalId({ PrincipalId });

        const BranchesByPlan = await Plans.GetPlanByPrincipal({ PrincipalId });

        if (BranchesByPrincipalId >= BranchesByPlan.BranchLimit) return next(new MyError(402, Messages.Branches.limit(BranchesByPlan.BranchLimit, Lang)));

        const Branch = await Branches.CreateBranch({
            PrincipalId,
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PhoneNumber
        });

        return res.status(200).json({
            message: Messages.Branches.created[Lang],
            results: Branch
        })

    }
}

export default new Controllers();