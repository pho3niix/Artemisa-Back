import Services, { IFilters, IPage } from '../../../Services/Index.services';
import States, { IStates } from '../../../Models/States.model';
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

    public async GetStateById({
        StateId
    }: { StateId: IStates['StateId'] }) {
        const State: any = await States.findOne({
            where: {
                StateId,
                Active: true
            },
            attributes: ['StateId', 'Name', 'Code']
        })
        return State ? State : null;
    }

}

export default new Queries(); 