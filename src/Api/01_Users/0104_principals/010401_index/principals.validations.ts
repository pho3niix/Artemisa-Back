import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public PrincipalParams: {
        UserId: string;
    }

    public PrincipalAndInstitutionParams: {
        UserId: string;
        BranchId: string;
    }

    public FilterQuery: {
        Search: string;
    }

    public BranchBody: object;

    constructor() {
        this.PrincipalParams = Validations.JoiObjectKeys({
            UserId: Validations.RequiredUUID("Principals PrincipalId")
        })

        this.PrincipalAndInstitutionParams = Validations.JoiObjectKeys({
            UserId: Validations.RequiredUUID("Principals PrincipalId"),
            BranchId: Validations.RequiredUUID("Branches BranchId")
        })

        this.FilterQuery = Validations.JoiObjectKeys({
            Search: Validations.String("Filters Search")
        })

        this.BranchBody = Validations.JoiObjectKeys({
            PublicName: Validations.RequiredStringLength('Branches PublicName', 100),
            Email: Validations.RequiredCorrectEmail('Branches Email'),
            Address: Validations.RequiredStringLength('Branches Address', 255),
            CityName: Validations.RequiredStringLength('Branches CityName', 100),
            ZipCode: Validations.RequiredNumber('Branches ZipCode'),
            StateId: Validations.RequiredUUID('Branches StateId'),
            PhoneNumber: Validations.RequiredCorrectPhoneNumber('Branches PhoneNumber')
        });
    }
}

export default new Rules();