import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public UsersBody: object;

    public UserParams: {
        UserId: string;
    }

    constructor() {
        this.UsersBody = Validations.JoiObjectKeys({
            Name: Validations.RequiredStringLength('Users Name', 50),
            LastName: Validations.RequiredStringLength('Users Lastname', 50),
            PhoneNumber: Validations.RequiredCorrectPhoneNumber('Users PhoneNumber'),
            Email: Validations.RequiredCorrectEmail('Users Email'),
            Password: Validations.CorrectPassword('Users Password'),
            ConfirmPassword: Validations.CorrectPassword('Users Password')
        });
        this.UserParams = Validations.JoiObjectKeys({
            UserId: Validations.RequiredUUID('Users UserId')
        });
    }
}

export default new Rules();