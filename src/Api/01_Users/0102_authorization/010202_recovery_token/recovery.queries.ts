import RecoveryToken, { IRecoveryToken } from '../../../../Models/RecoveryToken.model';
import { IUsers } from '../../../../Models/Users.model';
import IndexServices from '../../../../Services/Index.services';
import MailServices from '../../../../Services/Mailer.services';

interface IUserId {
    UserId: IRecoveryToken['UserId']
}

export interface IChangePassword {
    NewPassword: string;
    ConfirmNewPassword: string;
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

    public async SendRecoveryToken({
        User,
        Lang,
        Expiration // in minutes
    }: {
        User: IUsers;
        Lang: string;
        Expiration: number
    }): Promise<IRecoveryToken> {
        this.DeleteAllTokenByUserId({ UserId: User.UserId });

        const ExpiredDate: Date = IndexServices.ExpireToken(new Date(), Expiration);

        const Token: string = IndexServices.CreateRandomToken(64)

        const GeneratedToken: IRecoveryToken = await RecoveryToken.create({
            UserId: User.UserId,
            Token,
            ExpiresAt: ExpiredDate
        });

        const [Minutes, Hours, Seconds] = [ExpiredDate.getMinutes().toString(), ExpiredDate.getHours().toString(), ExpiredDate.getSeconds().toString()];

        MailServices.emit('SendRawEmail', {
            Emails: [User.Email],
            Data: {
                Message: `Por favor ingresa al siguiente enlace para actualizar tu contraseña: ${process.env.SERVER}${IndexServices.GetEnvironment(process.env.NODE_ENV)}/password-recovery?Token=${Token}&Host=${process.env.SERVER}${IndexServices.GetEnvironment(process.env.NODE_ENV)}&Lang=${Lang}`,
                Subject: 'Recuperación de contraseña'
            }
        })

        IndexServices.ScheduleTask({
            Minutes,
            Hours,
            Seconds
        }, async (data: null) => {
            await this.DeleteTokenById({
                Token,
                UserId: User.UserId
            })
        });

        return GeneratedToken
    }

    public async DeleteTokenById({
        Token,
        UserId
    }: { Token: string; UserId: string }): Promise<number> {
        return await RecoveryToken.destroy({
            where: {
                UserId,
                Token
            }
        })
    }

    public async DeleteAllTokenByUserId({
        UserId
    }: { UserId: IRecoveryToken['UserId'] }): Promise<number> {
        return await RecoveryToken.destroy({
            where: {
                UserId
            }
        })
    }

    public async GetTokenByUserId({
        UserId
    }: IUserId): Promise<IRecoveryToken> {
        return RecoveryToken.findOne({
            where: {
                UserId
            },
            order: [['tCreatedAt', 'desc']]
        })
    }

    public async GetTokenBy({
        Token
    }: { Token: string }): Promise<IRecoveryToken> {
        return RecoveryToken.findOne({
            where: {
                Token
            }
        })
    }
}

export default new Queries();