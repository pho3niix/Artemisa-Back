import Users, { IUsers } from '../../../Models/Users.model';
import Principals, { IPrincipals } from '../../../Models/Principals.model';
import SubscriptionPlans, { ISubscriptionPlans } from '../../../Models/SubscriptionPlans.model';
import Services, { IFilters, IPage } from '../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import AuthServices from '../../../Services/Auth.services';

export interface IUserId {
    UserId?: Users['UserId']
}

export interface IUpdate {
    UserId?: IUsers['UserId'];
    Name: IUsers['Name'];
    LastName: IUsers['LastName'];
    PhoneNumber: IUsers['PhoneNumber'];
}

// interface IFindOne {
//     PrincipalId: IUsers['UserId'];
//     PlanId: ISubscriptionPlans['PlanId']
// }

export interface ISave {
    Name: IUsers['Name'];
    LastName: IUsers['LastName'];
    Email: IUsers['Email'];
    PhoneNumber: IUsers['PhoneNumber'];
    Password: IUsers['Password'];
    ConfirmPassword?: string;
}

export interface IList {
    UserId: IUsers['UserId']
    Name: IUsers['Name'];
    LastName: IUsers['LastName'];
    FullName: IUsers['FullName']
    ContactInfo: {
        Email: IUsers['Email'];
        PhoneNumber: IUsers['PhoneNumber'];
    }
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail(User: IUsers): IList {
        return {
            UserId: User.UserId,
            Name: User.Name,
            LastName: User.LastName,
            FullName: User.FullName,
            ContactInfo: {
                Email: User.Email,
                PhoneNumber: User.PhoneNumber
            }
        }
    }
}

class Queries extends Structures {
    constructor() {
        super();
    }

    public async GetUserByEmail({ Email }: { Email: Users['Email'] }): Promise<IUsers> {
        return await Users.findOne({ where: { Email, Active: true } }) ?? null;
    }

    public async GetUserById({
        UserId
    }: IUserId): Promise<IList> {
        const User = await Users.findOne({
            where: {
                UserId,
                Active: true
            },
            attributes: ['UserId', 'Name', 'LastName', 'FullName', 'PhoneNumber', 'Email']
        })
        return User ? this._Detail(User) : null
    }

    public async VerifyUserById({
        UserId
    }: IUserId): Promise<{ UserId: Users['UserId'], PlatformAccess: Users['PlatformAccess'] }> {
        return await Users.findOne({
            where: {
                UserId,
                Active: true
            },
            attributes: ['UserId', 'PlatformAccess']
        })
    }

    public async ChangePlatformAccess({
        UserId,
        Access
    }: {
        UserId: Users['UserId'];
        Access: Users['PlatformAccess']
    }): Promise<void> {
        await Users.update({
            PlatformAccess: Access
        }, {
            where: {
                UserId,
                Active: true
            }
        })
    }

    public async SetPasswordByUserId({
        UserId,
        Password
    }: {
        UserId: Users['UserId']
        Password: Users['Password']
    }): Promise<number[]> {
        return await Users.update({
            Password: AuthServices.HashPassword(Password)
        }, {
            where: {
                UserId,
                Active: true
            }
        })
    }

    public async CreatePrincipal({
        PrincipalId,
        PlanId
    }: IPrincipals): Promise<IPrincipals> {
        return await Principals.create({
            PrincipalId,
            PlanId
        })
    }

    // public async GetPlanByPrincipal({
    //     PlanId,
    //     PrincipalId
    // }: IFindOne): Promise<IList[]> {
    //     const PlansList: any = await SubscriptionPlans.findOne({
    //         where: {
    //             Active: true,
    //             PlanId,
    //             '$Principal->User.UserId$': PrincipalId
    //         },
    //         attributes: ['PlanId', 'Name', 'Code', 'Description', 'Price', 'ChildrenCapacity'],
    //         include: [
    //             {
    //                 model: Principals,
    //                 as: 'Principal',
    //                 attributes: ['PrincipalId'],
    //                 include: [
    //                     {
    //                         model: Users,
    //                         as: 'User',
    //                         attributes: ['UserId', 'Name', 'LastName', 'Email']
    //                     }
    //                 ]
    //             }
    //         ]
    //     })

    //     return
    // }

    public async UpdateUserById({
        UserId,
        Name,
        LastName,
        PhoneNumber
    }: IUpdate): Promise<IList> {
        await Users.update({
            Name,
            LastName,
            PhoneNumber,
            UpdatedAt: new Date()
        }, {
            where: {
                UserId,
                Active: true
            }
        })

        return this.GetUserById({ UserId });
    }
}

export default new Queries();