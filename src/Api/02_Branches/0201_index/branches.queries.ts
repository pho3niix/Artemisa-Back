import Services, { IFilters, IPage } from '../../../Services/Index.services';
import Institutions, { IInstitutions } from '../../../Models/Institutions.model';
import Principals, { IPrincipals } from '../../../Models/Principals.model';
import Branches from '../../../Models/Branches.model';
import { Op, literal } from 'sequelize';

interface ICreateBranch extends IInstitutions {
    PrincipalId: IPrincipals['PrincipalId'];
}

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

    public async CreateBranch({
        PublicName,
        Email,
        Address,
        CityName,
        ZipCode,
        StateId,
        PrincipalId,
        PhoneNumber
    }: ICreateBranch): Promise<IInstitutions> {
        const Institution = await Institutions.create({
            PublicName,
            Email,
            Address,
            CityName,
            StateId,
            ZipCode,
            PhoneNumber
        });

        const Branch = await Branches.create({
            InstitutionId: Institution.InstitutionId,
            PrincipalId
        });

        return Institution
    }

    public async GetBranchesByPrincipalId({ PrincipalId }: { PrincipalId: IPrincipals['PrincipalId'] }): Promise<Number> {
        return Branches.count({
            where: {
                PrincipalId
            }
        })
    }
}

export default new Queries(); 