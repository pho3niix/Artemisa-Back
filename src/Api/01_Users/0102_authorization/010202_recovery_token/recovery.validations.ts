import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public RecoveryBody: {
        Email: string;
    };

    public ChangePasswordBody: {
        NewPassword: string;
        ConfirmNewPassword: string;
    }

    public ChangePasswordQuery: {
        Token: string;
    }

    constructor() {
        this.RecoveryBody = Validations.JoiObjectKeys({
            Email: Validations.RequiredCorrectEmail('Users Email')
        })
        this.ChangePasswordBody = Validations.JoiObjectKeys({
            NewPassword: Validations.CorrectPassword('Users Password'),
            ConfirmNewPassword: Validations.CorrectPassword('Users Password')
        })
        this.ChangePasswordQuery = Validations.JoiObjectKeys({
            Token: Validations.RequiredString('RecoveryPassword Token')
        })
    }
}

export default new Rules();