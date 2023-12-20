import Bcrypt from 'bcryptjs';
import { IUsers } from '../../../../Models/Users.model';

export interface ILogin {
    Email: IUsers['Email'];
    Password: IUsers['Password']
}

class Methods {
    constructor() { }

    public HashPassword(Password: string): string {
        return Bcrypt.hashSync(Password, Bcrypt.genSaltSync(10));
    }

    public ConfirmPassword(Password: string, NewPassword: string): boolean {
        return Password != NewPassword;
    }

    public ComparePassword(Password: string, sHash: string): boolean {
        return Bcrypt.compareSync(Password, sHash);
    }
}

export default new Methods();