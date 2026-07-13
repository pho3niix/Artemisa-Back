import { Joi } from 'celebrate';
import { Validations } from '../../../00_Index/Index.middlewares';
import { ILogin } from './sessions.queries';

class Rules {

    public Login: ILogin;

    constructor() {
        this.Login = Joi.object().keys({
            Email: Validations.RequiredCorrectEmail('Login Email'),
            Password: Validations.CorrectPassword('Login Password')
        })
    }
}

export default new Rules();