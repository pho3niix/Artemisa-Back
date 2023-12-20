import Users, { IUsers } from '../../../../Models/Users.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import AuthServices from './auth.services'

export interface ISave {
    Name: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    ConfirmPassword?: string;
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

    public async SignUp({
        Name,
        LastName,
        Email,
        Password,
        PhoneNumber
    }: ISave): Promise<IUsers> {
        const User = await Users.create({
            Name,
            LastName,
            Email,
            Password: AuthServices.HashPassword(Password),
            PhoneNumber
        })

        return await Users.findOne({
            where: { UserId: User.UserId },
            attributes: ['UserId', 'Name', 'LastName', 'Email', 'FullName']
        })
    }
}

export default new Queries();