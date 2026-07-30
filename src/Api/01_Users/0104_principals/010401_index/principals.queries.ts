import Users, { IUsers } from '../../../../Models/Users.model';
import Principals, { IPrincipals } from '../../../../Models/Principals.model';
import SubscriptionPlans, { ISubscriptionPlans } from '../../../../Models/SubscriptionPlans.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';

interface IUserPrincipal {
    PrincipalId: Principals['PrincipalId'];
    Users: IUsers
}

interface IDetail {
    PrincipalId: Principals['PrincipalId'],
    Name: IUsers['Name'],
    LastName: IUsers['LastName'],
    Email: IUsers['Email'],
    Active: IUsers['Active']
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail(Principal: IUserPrincipal):IDetail {
        return {
            PrincipalId: Principal.PrincipalId,
            Name: Principal.Users.Name,
            LastName: Principal.Users.LastName,
            Email: Principal.Users.Email,
            Active: Principal.Users.Active
        }
    }
}

class Queries extends Structures {
    constructor() {
        super();
    }

    public async GetPrincipalById({ PrincipalId }: { PrincipalId: Principals['PrincipalId'] }): Promise<IDetail> {
        const Principal: any = await Principals.findOne({
            where: {
                PrincipalId,
                '$Users.Active$': true
            },
            include: {
                model: Users,
                as: 'Users',
                attributes: ['UserId', 'Name', 'LastName', 'Email', 'Active']
            }
        })

        return this._Detail(Principal)
    }
}

export default new Queries(); 