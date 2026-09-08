import Users, { IUsers } from '../../../../Models/Users.model';
import Principals, { IPrincipals } from '../../../../Models/Principals.model';
import Institutions, { IInstitutions } from '../../../../Models/Institutions.model';
import Branches, { IBranches } from '../../../../Models/Branches.model';
import SubscriptionPlans, { ISubscriptionPlans } from '../../../../Models/SubscriptionPlans.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import States, { IStates } from '../../../../Models/States.model';

interface ICreateBranch extends IInstitutions {
    PrincipalId?: IPrincipals['PrincipalId'];
    Institution?: Institutions;
}

interface IUserPrincipal {
    PrincipalId?: Principals['PrincipalId'];
    User: IUsers
}

interface IBranchDetail {
    BranchId: Branches['InstitutionId']
    PrincipalId?: Principals['PrincipalId']
}

interface IDetail {
    PrincipalId?: Principals['PrincipalId'],
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

    public async GetCountBranchesByPrincipalId({ PrincipalId }: { PrincipalId: IPrincipals['PrincipalId'] }): Promise<number> {
        return Branches.count({
            where: {
                PrincipalId
            }
        })
    }

    public async GetInstitutionsByPrincipalId({ PrincipalId, Search }: { PrincipalId: IPrincipals['PrincipalId'], Search?: string }): Promise<IInstitutions[]> {
        const BranchesByPrincipalId = await Branches.findAll({
            where: {
                PrincipalId
            },
            attributes: ['InstitutionId']
        });

        let Params: any = {
            where: {
                InstitutionId: {
                    [Op.in]: BranchesByPrincipalId.map((branch) => branch.InstitutionId)
                }
            },
            attributes: ['InstitutionId', 'PublicName', 'Email', 'Address', 'CityName', 'ZipCode', 'PhoneNumber'],
            include: {
                model: States,
                attributes: ['StateId', 'Name', 'Code']
            }
        };

        if (Search) {
            Params.where = {
                ...Params.where,
                [Op.or]: [
                    { PublicName: { [Op.iLike]: `%${Search}%` } },
                    { Address: { [Op.iLike]: `%${Search}%` } },
                    { PhoneNumber: { [Op.iLike]: `%${Search}%` } },
                    { CityName: { [Op.iLike]: `%${Search}%` } },
                    { ZipCode: { [Op.iLike]: `%${Search}%` } },
                    { '$State.Name$': { [Op.iLike]: `%${Search}%` } }
                ]
            }
        }

        const InstitutionIds = await Institutions.findAll(Params);

        return InstitutionIds;
    }

    public async UpdateInstitutionByPrincipal({
        Institution,
        PublicName,
        Email,
        Address,
        CityName,
        ZipCode,
        StateId,
        PhoneNumber
    }: ICreateBranch): Promise<IInstitutions> {
        return await Institution.update({
            PublicName,
            Email,
            Address,
            CityName,
            ZipCode,
            StateId,
            PhoneNumber
        });;
    }

    public async GetInstitutionByBranchId({ BranchId, PrincipalId }: IBranchDetail): Promise<Institutions> {
        const Branch = await Branches.findOne({
            where: {
                InstitutionId: BranchId,
                PrincipalId
            }
        });

        if (!Branch) return null;

        const Institution = await Institutions.findOne({
            where: {
                InstitutionId: Branch.InstitutionId,
                Active: true
            }
        })

        return Institution ? Institution : null;
    }

    public async DeleteInstitutionByBranchId({ BranchId, PrincipalId }: IBranchDetail): Promise<number> {
        return await Branches.destroy({
            where: {
                InstitutionId: BranchId,
                PrincipalId
            }
        })
    }
}

export default new Queries(); 