import Users, { IUsers } from '../../../Models/Users.model';
import Services, { IFilters, IPage } from '../../../Services/Index.services';
import { Op, literal } from 'sequelize';

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

    public async GetUserByEmail({ Email }: { Email: Users['Email'] }): Promise<IUsers> {
        return await Users.findOne({ where: { Email, Active: true } }) ?? null;
    }
}

export default new Queries();