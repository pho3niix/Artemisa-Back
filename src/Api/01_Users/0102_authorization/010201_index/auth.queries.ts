import Users, { IUsers } from '../../../../Models/Users.model';
import Plans, { ISubscriptionPlans } from '../../../../Models/SubscriptionPlans.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';
import AuthServices from '../../../../Services/Auth.services';
import IndexServices from '../../../../Services/Index.services';
import Mailer from '../../../../Services/Mailer.services';

export interface ISave {
    Name: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    PlanId: ISubscriptionPlans['PlanId'];
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
        PhoneNumber
    }: ISave): Promise<IUsers> {
        const User = await Users.create({
            Name,
            LastName,
            Email,
            Password: IndexServices.RandomPassword(10).hash,
            PhoneNumber
        })

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