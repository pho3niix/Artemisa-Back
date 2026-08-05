import Users, { IUsers } from '../../../../Models/Users.model';
import Principals, { IPrincipals } from '../../../../Models/Principals.model';
import SubscriptionPlans, { ISubscriptionPlans } from '../../../../Models/SubscriptionPlans.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';

interface IUserPrincipal {
    PrincipalId: Principals['PrincipalId'];
    User: IUsers
}

interface IDetail {
    PrincipalId: Principals['PrincipalId'],
    Name: IUsers['Name'],
    LastName: IUsers['LastName'],
    Email: IUsers['Email'],
    Active: IUsers['Active']
    ProfilePicture: IUsers['ProfilePicture']
    PhoneNumber: IUsers['PhoneNumber']
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail(Principal: IUserPrincipal): IDetail {
        return Principal ? {
            PrincipalId: Principal.PrincipalId,
            Name: Principal.User.Name,
            LastName: Principal.User.LastName,
            Email: Principal.User.Email,
            Active: Principal.User.Active,
            ProfilePicture: Principal.User.ProfilePicture,
            PhoneNumber: Principal.User.PhoneNumber,
        } : null
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
                '$User.Active$': true
            },
            include: {
                model: Users,
                as: 'User',
                attributes: ['UserId', 'Name', 'FullName', 'LastName', 'Email', 'ProfilePicture', 'PhoneNumber']
            }
        })

        return this._Detail(Principal);
    }
}

export default new Queries(); 