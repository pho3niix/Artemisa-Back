import { Principals, States, Plans } from '../../../00_Index/Index.models';
import { Request, Response, NextFunction } from 'express';
import { MyError } from '../../../00_Index/Index.middlewares';
import Messages from '../../../00_Index/Index.messages';

class Controllers {
    constructor() { }

    public async DeleteInstitutionByBranchId(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId,
            BranchId
        } = req.params;

        const Principal = await Principals.GetPrincipalById({ PrincipalId: UserId });

        if (!Principal) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const Institution = await Principals.GetInstitutionByBranchId({ BranchId, PrincipalId: UserId });

        if (!Institution) return next(new MyError(404, Messages.Institutions.get.byId.notFound[Lang]));

        const Branch = await Principals.DeleteInstitutionByBranchId({ PrincipalId: UserId, BranchId });

        return res.status(200).json({
            message: Messages.Institutions.update.success[Lang],
            results: Institution
        })
    }

    public async UpdateInstitutionByPrincipal(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId,
            BranchId
        } = req.params;

        const {
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PhoneNumber
        } = req.body;

        const Principal = await Principals.GetPrincipalById({ PrincipalId: UserId });

        if (!Principal) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const Institution = await Principals.GetInstitutionByBranchId({ BranchId, PrincipalId: UserId });

        if (!Institution) return next(new MyError(404, Messages.Institutions.get.byId.notFound[Lang]));

        const State = await States.GetStateById({ StateId });

        if (!State) return next(new MyError(404, Messages.Locations.States.get.byId.notFound[Lang]));

        const ModifiedInstitution = await Principals.UpdateInstitutionByPrincipal({
            Institution,
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PhoneNumber
        });

        return res.status(200).json({
            message: Messages.Institutions.update.success[Lang],
            results: ModifiedInstitution
        })
    }

    public async GetInstitutionsByPrincipalId(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId
        } = req.params;

        const {
            Search
        } = req.query;

        const Principal = await Principals.GetPrincipalById({ PrincipalId: UserId });

        if (!Principal) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const Institutions = await Principals.GetInstitutionsByPrincipalId({ PrincipalId: UserId, Search: Search as string });

        return res.status(200).json({
            message: Messages.Institutions.get.success[Lang],
            results: Institutions
        })
    }

    public async CreateBranchByPrincipal(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            Lang
        } = res.locals;

        const {
            UserId
        } = req.params;

        const {
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PhoneNumber
        } = req.body;

        const State = await States.GetStateById({ StateId });

        if (!State) return next(new MyError(404, Messages.Locations.States.get.byId.notFound[Lang]));

        const Principal = await Principals.GetPrincipalById({ PrincipalId: UserId });

        if (!Principal) return next(new MyError(404, Messages.Users.getById.notFound[Lang]));

        const BranchesByPrincipalId = await Principals.GetCountBranchesByPrincipalId({ PrincipalId: UserId });

        const BranchesByPlan = await Plans.GetPlanByPrincipal({ PrincipalId: UserId });

        if (BranchesByPrincipalId >= BranchesByPlan.BranchLimit) return next(new MyError(402, Messages.Branches.limit(BranchesByPlan.BranchLimit, Lang)));

        const Branch = await Principals.CreateBranch({
            PrincipalId: UserId,
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

    async GetPlanByPrincipal(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const {
            UserId
        } = req.params;

        const {
            Lang
        } = res.locals;


        const Principal = await Principals.GetPrincipalById({ PrincipalId: UserId });

        if (!Principal) return next(new MyError(404, Messages['Users']['getById']['notFound'][Lang]));

        const Plan = await Plans.GetPlanByPrincipal({ PrincipalId: UserId });

        if (!Plan) return next(new MyError(404, Messages.SubscriptionPlans.getById.notFound[Lang]));

        return res.status(200).json({
            message: Messages.SubscriptionPlans.getById.success[Lang],
            results: {
                ...Principal,
                ...{ Plan }
            }
        })
    }
}

export default new Controllers();