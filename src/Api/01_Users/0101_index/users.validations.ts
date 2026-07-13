import { Validations } from '../../00_Index/Index.middlewares';

class Rules {

    public UserUpdate: object;

    public UserParams: {
        UserId: string;
    }

    public UserQueries: object;

    constructor() {
        this.UserParams = Validations.JoiObjectKeys({
            UserId: Validations.RequiredUUID('Users UserId')
        });
        this.UserQueries = Validations.JoiObjectKeys({
            ...Validations.Filters
        });
        this.UserUpdate = Validations.JoiObjectKeys({
            Name: Validations.RequiredStringLength('Users Name', 50),
            LastName: Validations.RequiredStringLength('Users Lastname', 50),
            PhoneNumber: Validations.RequiredCorrectPhoneNumber('Users PhoneNumber')
        })
    }
}

export default new Rules();