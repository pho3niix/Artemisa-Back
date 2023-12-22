import Users, { IUsers } from '../../../Models/Users.model';
import Services, { IFilters, IPage } from '../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import AuthServices from '../../../Services/Auth.services';

interface IUserId {
    UserId: Users['UserId']
}

export interface ISave {
    Name: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
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
        return this._Detail(User)
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
}

export default new Queries();