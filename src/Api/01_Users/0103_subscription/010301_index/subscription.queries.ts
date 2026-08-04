import Users, { IUsers } from '../../../../Models/Users.model';
import Principals, { IPrincipals } from '../../../../Models/Principals.model'
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import SubscriptionPlans, { ISubscriptionPlans } from '../../../../Models/SubscriptionPlans.model'
import Institutions, { IInstitutions } from '../../../../Models/Institutions.model'

export interface IBase {
    Name: ISubscriptionPlans['Name'];
    Code: ISubscriptionPlans['Code'];
    Description: ISubscriptionPlans['Description'];
    Price: ISubscriptionPlans['Price'];
    ChildrenCapacity: ISubscriptionPlans['ChildrenCapacity'];
    BranchLimit: ISubscriptionPlans['BranchLimit'];
}

export interface IPlanByPrincipal {
    PrincipalId: IPrincipals['PrincipalId']
    SubscriptionPlan: IBase
}

export interface IUpdate extends IBase {
    PlanId: ISubscriptionPlans['PlanId']
}

export interface IList extends IUpdate {
    Principal: {
        PrincipalId: IPrincipals['PrincipalId']
        Name: IUsers['Name']
        LastName: IUsers['LastName']
        Email: IUsers['Email']
    }
}

interface IPlanId {
    PlanId: ISubscriptionPlans['PlanId']
}

interface IGetByCode {
    PlanId: ISubscriptionPlans['PlanId']
    Name: ISubscriptionPlans['Name']
    Code: ISubscriptionPlans['Code']
}

interface IGetById extends IGetByCode {
    Description: ISubscriptionPlans['Description']
    Price: ISubscriptionPlans['Price']
    ChildrenCapacity: ISubscriptionPlans['ChildrenCapacity']
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail() {

    }
}

class Queries extends Structures {
    constructor() {
        super();
    }

    public async GetPlanByPrincipal({
        PrincipalId
    }: { PrincipalId: IPrincipals['PrincipalId'] }): Promise<IPlanByPrincipal> {
        const Plan: any = await Principals.findOne({
            where: {
                PrincipalId,
            },
            attributes: ['Plans.PlanId', 'Plans.Name', 'Plans.Code', 'Plans.Description', 'Plans.ChildrenCapacity', 'Plans.BranchLimit'],
            include: {
                model: SubscriptionPlans,
                as: 'Plans',
                attributes: ['PlanId', 'Name', 'Code', 'Description', 'Price', 'ChildrenCapacity', 'BranchLimit']
            }
        })

        return Plan ? Plan.Plans : null
    }

    public async CreateSubscriptionPlan({
        Name,
        Code,
        Description,
        Price,
        ChildrenCapacity,
        BranchLimit
    }: IBase): Promise<IGetById> {
        const Plan = await SubscriptionPlans.create({
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity,
            BranchLimit
        })

        return this.GetPlanById({ PlanId: Plan.PlanId })
    }

    public async GetPlanByCode({
        Code
    }: { Code: ISubscriptionPlans['Code'] }): Promise<IGetByCode> {
        return await SubscriptionPlans.findOne({
            where: {
                Code,
                Active: true
            },
            attributes: ['PlanId', 'Name', 'Code', 'Description', 'Price', 'ChildrenCapacity', 'BranchLimit']
        })
    }

    public async GetPlanById({
        PlanId
    }: IPlanId): Promise<IGetById> {
        return await SubscriptionPlans.findOne({
            where: {
                PlanId,
                Active: true
            },
            attributes: ['PlanId', 'Name', 'Code', 'Description', 'Price', 'ChildrenCapacity', 'BranchLimit']
        })
    }

    public async UpdatePlanById({
        PlanId,
        Name,
        Code,
        Description,
        Price,
        ChildrenCapacity,
        BranchLimit
    }: IUpdate): Promise<IGetById> {
        await SubscriptionPlans.update({
            Name,
            Code,
            Description,
            Price,
            ChildrenCapacity,
            BranchLimit
        }, {
            where: {
                PlanId,
                Active: true
            }
        })

        return this.GetPlanById({ PlanId })
    }

    public async RemovePlanById({
        PlanId
    }: IPlanId): Promise<IGetById> {
        const Plan = await this.GetPlanById({ PlanId })

        await SubscriptionPlans.update({
            Active: false
        }, {
            where: {
                PlanId,
                Active: true
            }
        })

        return Plan
    }
}

export default new Queries();