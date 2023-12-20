import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public UserUpdate: object;

    public UsersBody: object;

    public UserParams: {
        UserId: string;
    }

    public UserQueries: object;

    private BaseBody: object;

    constructor() {
        this.BaseBody = {
            Name: Validations.RequiredStringLength('Users Name', 50),
            LastName: Validations.RequiredStringLength('Users Lastname', 50),
            PhoneNumber: Validations.RequiredCorrectPhoneNumber('Users PhoneNumber')
        }
        this.UsersBody = Validations.JoiObjectKeys({
            ...this.BaseBody,
            Email: Validations.RequiredCorrectEmail('Users Email'),
            Password: Validations.CorrectPassword('Users Password'),
            ConfirmPassword: Validations.CorrectPassword('Users Password')
        });
        this.UserParams = Validations.JoiObjectKeys({
            UserId: Validations.RequiredUUID('Users UserId')
        });
        this.UserQueries = Validations.JoiObjectKeys({
            ...Validations.Filters
        });
        this.UserUpdate = Validations.JoiObjectKeys({
            ...this.BaseBody
        })
    }
}

export default new Rules();