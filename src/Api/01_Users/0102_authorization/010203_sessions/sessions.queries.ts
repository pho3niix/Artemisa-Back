import Services, { IFilters, IPage } from '../../../../Services/Index.services';
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
}

export default new Queries();