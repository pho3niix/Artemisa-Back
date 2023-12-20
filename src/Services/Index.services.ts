import crypto from 'crypto';
import cryptojs from 'crypto-js';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import MyError from '../Middlewares/Error.mw';
import Messages from '../Api/00_Index/Index.messages';
import { randomUUID } from 'crypto';
import cron from 'node-cron';

export interface IPage<M> {
    results: M[],
    total: number
}

export interface ILanguages {
    Lang: 'sp' | 'en';
}

export interface IEnvironment {
    Environment: 'development' | 'testing' | 'preproduction' | 'production' | 'local' | 'local_prod' | 'local_dev' | 'local_qa' | 'local_alfa' | 'supertest' | string;
}

export interface ISortFilter {
    Sort: 'asc' | 'desc';
}

export interface IPayload {
    UserId: string;
    SessionId: string;
};

export interface IFilters {
    PageNumber?: number;
    ItemsPerPage?: number;
    Search?: string;
    Start?: string;
    End?: string;
}


export interface IHashData {
    UserId: string;
    SessionId: string;
    Expiration?: Date;
}

export interface ICustomPage<X> {
    total: number;
    results: X[]
}

class Methods {
    constructor() { }

    public GetFullPhoneNumber(sPhone: string, sExtension: string): string {
        let Phone: string = sPhone;
        let [First, Second, Third] = [Phone.slice(0, 2), Phone.slice(2, 6), Phone.slice(6, Phone.length)]
        Phone = `+52 (${First}) ${Second}-${Third}`;
        if (sExtension != null) Phone = Phone + ' ext. ' + sExtension;

        return Phone
    }

    GetEnvironment(Variable: IEnvironment['Environment']): string {
        let Environment: string = null;
        switch (Variable) {
            case 'development':
                Environment = '/dev';
                break;
            case 'testing':
                Environment = '/qa';
                break;
            case 'preproduction':
                Environment = '/alfa';
                break;
            case 'production':
                Environment = '';
                break;
            case 'local':
            case 'local_prod':
            case 'local_dev':
            case 'local_qa':
            case 'local_alfa':
            case 'supertest':
                Environment = '';
                break;
            default:
                Environment = '/dev';
                break;
        }
        return Environment
    }

    GetDiff(timeZone: string): number {
        const timeZoneName = Intl.DateTimeFormat("ia", {
            timeZoneName: "short",
            timeZone,
        })
            .formatToParts()
            .find((i) => i.type === "timeZoneName").value;
        const offset = timeZoneName.slice(3);
        if (!offset) return 0;

        const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/);
        if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`;

        const [, sign, hour, minute] = matchData;
        let result = parseInt(hour) * 60;
        if (sign === "-") result *= -1;
        if (minute) result + parseInt(minute);

        return result;
    }

    GetDate(tDate: Date): Date {
        const offset: number = this.GetDiff('America/Monterrey');

        const localDateInMilliseconds: number = tDate.setHours(tDate.getHours() + (offset / 60));

        return new Date(localDateInMilliseconds);
    }

    FindDuplicates(arry: string[]): string[] {
        return arry.filter((item, index) => arry.indexOf(item) !== index)
    }

    FindMissing(arry: string[], arry2: string[]): string[] {
        return arry.filter(item => arry2.find(e => e == item) !== item)
    }

    FindIndexDuplicates(array: string[]): number[] {
        return array.map((item, index) => {
            if (array.indexOf(item) !== index) {
                return index
            }
        })
    }

    RandomPassword(iLength: number): { hash: string, plane: string } {

        let random = crypto.randomBytes(iLength).toString();

        let encrypt = cryptojs.AES.encrypt(random, process.env.AES_SECRET).toString();

        let temporal = encrypt.slice(0, iLength)

        const HashPassword = Bcrypt.hashSync(temporal, Bcrypt.genSaltSync(10));

        return {
            hash: HashPassword,
            plane: temporal
        };
    };

    RandomFolio(sType: 'Users' | 'Clients' | 'Projects' | 'Folder' | 'Document' | 'Orders'): string {
        const Prefix = {
            Users: 'US',
            Clients: 'CX',
            Projects: 'PX',
            Folder: 'FD',
            Document: 'DX',
            Orders: 'PO'
        };

        let pincode: string[] = [];
        let loopTimes: number = 8;

        for (let i = 0; i < loopTimes; i++) {
            let numeric: string = crypto.randomBytes(1).toString('hex');
            let array: string[] = numeric.split('');
            let logs: string = array[Math.floor(Math.random() * array.length)]
            pincode.push(logs);
        }
        return Prefix[sType] + '-' + pincode.join('').toUpperCase();
    }

    DecryptObject(string: string): IHashData {
        const text = cryptojs.AES.decrypt(string, process.env.AES_SECRET).toString(cryptojs.enc.Utf8);
        const parse = JSON.parse(text);

        return parse;
    };

    ValidJSONString(string: string): boolean {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }

    EncryptObject(object: object): string {
        let stringify = JSON.stringify(object);
        return cryptojs.AES.encrypt(stringify, process.env.AES_SECRET).toString();
    };

    ExpireToken(tDate: Date, iMinutes: number): Date {
        return new Date(tDate.getTime() + (iMinutes * 60 * 1000));
    }

    CreateJWTToken(payload: any): string {
        return jwt.sign({
            hash: this.EncryptObject(payload)
        }, process.env.JWT_SECRET, {
            algorithm: 'HS256'
        });
    }

    CreateToken(payload: IPayload): string {
        const { UserId, SessionId } = payload;
        const NewPayload: IPayload = {
            UserId: UserId,
            SessionId: SessionId,
        }
        return jwt.sign({
            hash: this.EncryptObject(NewPayload)
        }, process.env.JWT_SECRET, {
            algorithm: 'HS256'
        })
    };

    CreateRandomToken(Bytes: number): string {
        return crypto.randomBytes(Bytes).toString('hex');
    }

    GetTime(tDate: Date): number {
        const offset = tDate.getTimezoneOffset();

        const localDateInMilliseconds = tDate.setHours(tDate.getHours() - (offset / 60));

        tDate = new Date(localDateInMilliseconds);

        return tDate.getTime();
    }

    AddDays(date: Date, days: number): Date {
        date = new Date(date);
        date.setDate(date.getDate() + days);
        return date;
    }

    RandomNumbers(iLength: number): string {
        const numbers: number[] = [1, 2, 3, 5, 6, 7, 8, 9, 0];
        let result: string[] = [];
        for (let i = 0; i < iLength; i++) {
            result.push(numbers[Math.floor(Math.random() * 10)].toString());
        }
        return result.join('');
    }

    PairEncrypt(data: string, key: crypto.RsaPublicKey): Buffer {
        return crypto.publicEncrypt(key, Buffer.from(data));
    }

    PairDecrypt(data: string, key: crypto.RsaPrivateKey): Buffer {
        return crypto.privateDecrypt(key, Buffer.from(data));
    }

    FormatDate(date: Date): string {
        return moment(date).format('D MMMM YYYY')
    }

    FormatDateWithHours(date: Date): string {
        return moment(date).format('D MMMM YYYY hh:mma')
    }

    async ValidateLists({
        List,
        PageNumber,
        ItemsPerPage,
        Lang
    }: {
        List: IPage<any>;
        PageNumber: number
        ItemsPerPage: number,
        Lang: string
    }): Promise<{
        List: any
        Total: number
        CurrentPage: number
        NumPages: number
    }> {
        if (PageNumber && (isNaN(Number(PageNumber)) || Number(PageNumber) <= 0)) return Promise.reject(new MyError(404, Messages.Pagination.invalidNumber[Lang]));

        const Total = List.total;
        const CurrentPage: number = PageNumber && ItemsPerPage ? Number(PageNumber) : 1;
        const NumPages = Total > 1 ? Math.ceil(Number(Total) / Number(ItemsPerPage)) : 1;

        if (Number(PageNumber) > Number(NumPages)) return Promise.reject(new MyError(400, Messages.Pagination.maximumNumber[Lang]));

        return {
            List: List.results,
            Total,
            CurrentPage,
            NumPages
        }
    }

    RandomUUID(): string {
        return randomUUID()
    }

    public GetPercentage({
        CurrentPrice,
        OriginalPrice
    }: { OriginalPrice: number, CurrentPrice: number }): number {
        let TotalPercentage: number = 100;
        return 100 - parseFloat(((CurrentPrice * TotalPercentage) / OriginalPrice).toFixed(2))
    }

    public ScheduleTask({
        Seconds,
        Minutes,
        Hours
    }: {
        Seconds: string;
        Minutes: string;
        Hours: string;
    }, done: Function): void {
        const Task = cron.schedule(`${Seconds} ${Minutes} ${Hours} * * *`, async () => {
            done(null)
            console.log('Token deleted.');
            Task.stop();
        });
    }
}

export default new Methods();