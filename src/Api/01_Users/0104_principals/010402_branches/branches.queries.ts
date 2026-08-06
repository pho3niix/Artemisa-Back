import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import Institutions from '../../../../Models/Institutions.model';
import Branches from '../../../../Models/Branches.model';
import { Op, literal } from 'sequelize';

interface IDetail {
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail() {
        return
    }
}

class Queries extends Structures {
    constructor() {
        super();
    }

    public async CreateBranch(){

    }
}

export default new Queries(); 