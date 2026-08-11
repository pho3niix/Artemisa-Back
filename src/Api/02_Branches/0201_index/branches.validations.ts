import { Joi } from 'celebrate';
import { Validations } from '../../00_Index/Index.middlewares';

class Rules {

    public BranchBody: object;

    public BranchParams: {
        BranchId: string
    }

    constructor() {
        this.BranchBody = Validations.JoiObjectKeys({
            PublicName: Validations.RequiredStringLength('Branches PublicName', 100),
            Email: Validations.RequiredCorrectEmail('Branches Email'),
            Address: Validations.RequiredStringLength('Branches Address', 255),
            CityName: Validations.RequiredStringLength('Branches CityName', 100),
            ZipCode: Validations.RequiredNumber('Branches ZipCode'),
            StateId: Validations.RequiredUUID('Branches StateId'),
            PrincipalId: Validations.RequiredUUID('Branches PrincipalId'),
            PhoneNumber: Validations.RequiredCorrectPhoneNumber('Branches PhoneNumber')
        });

        this.BranchParams = Validations.JoiObjectKeys({
            BranchId: Validations.RequiredUUID('Branches BranchId')
        });
    }
}

export default new Rules();