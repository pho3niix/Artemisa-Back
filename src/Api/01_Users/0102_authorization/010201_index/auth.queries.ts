import Users, { IUsers } from '../../../../Models/Users.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import AuthServices from '../../../../Services/Auth.services';
import Mailer from '../../../../Services/Mailer.services';

export interface ISave {
    Name: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    ConfirmPassword?: string;
}

class Structures {
    constructor() { }

    protected _List() {

    }

    protected _Detail() {

    }
}

class Queries extends Structures {
    constructor() {
        super();
    }

    public async SignUp({
        Name,
        LastName,
        Email,
        Password,
        PhoneNumber
    }: ISave): Promise<IUsers> {
        const User = await Users.create({
            Name,
            LastName,
            Email,
            Password: AuthServices.HashPassword(Password),
            PhoneNumber
        })

        this.WelcomeMessage({ User });

        return await Users.findOne({
            where: { UserId: User.UserId },
            attributes: ['UserId', 'Name', 'LastName', 'Email', 'FullName']
        })
    }

    private WelcomeMessage({
        User
    }: {
        User: Users;
    }): void {
        Mailer.emit('SendRawEmail', {
            Emails: [User.Email],
            Data: {
                Subject: 'Bienvenido a Artemisa',
                Message: `Por favor ingresa al siguiente enlace para confirmar tu registro: ${process.env.SERVER}/api/v1/auth/${User.UserId}`
            }
        })
    }
}

export default new Queries();