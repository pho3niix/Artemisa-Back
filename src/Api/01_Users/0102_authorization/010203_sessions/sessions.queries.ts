import Sessions, { ISessions } from '../../../../Models/Sessions.model';
import Users, { IUsers } from '../../../../Models/Users.model';
import Services, { IFilters, IPage } from '../../../../Services/Index.services';
import { Op, literal } from 'sequelize';

export interface ISave {
    UserId: Users['UserId'];
    Expiration: number;
}

export interface ILogin {
    Email: Users['Email'];
    Password: Users['Password'];
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

    public async CreateSession({
        UserId,
        Expiration
    }: ISave): Promise<string> {
        const Session = await Sessions.create({
            UserId,
            ExpiresAt: Services.ExpireToken(new Date(), Expiration)
        });

        return Services.CreateToken({ UserId, SessionId: Session.SessionId });;
    }

    public async LogOut({
        SessionId
    }: { SessionId: Sessions['SessionId'] }): Promise<number> {
        return await Sessions.destroy({
            where: {
                SessionId
            }
        })
    }

    public async VerifySession({
        SessionId
    }: { SessionId: ISessions['SessionId'] }): Promise<ISessions> {
        return await Sessions.findOne({
            where: {
                SessionId
            }
        }) ?? null
    }

    public async DeleteAllSessionsByUser({
        UserId
    }: { UserId: Users['UserId'] }): Promise<number> {
        return Sessions.destroy({
            where: {
                UserId
            }
        })
    }

    public async RefreshToken({
        SessionId,
        Expiration
    }: {
        SessionId: ISessions['SessionId']
        Expiration: number
    }): Promise<void> {
        const ExtendTime = Services.ExpireToken(new Date(), Expiration);
        await Sessions.update({
            ExpiresAt: ExtendTime
        }, {
            where: {
                SessionId
            }
        })
    }
}

export default new Queries();