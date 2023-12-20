import Events from 'events';
import Fs from 'fs';
import Path from 'path';
import { SES, config } from 'aws-sdk';
import handlebars from 'handlebars';

interface IMailTypes {
    Type: 'welcome' | 'recovery' | 'password';
}

interface IMail {
    Emails: any[],
    Data: any,
    Type: IMailTypes['Type'],
    Subject: string
}

interface ISendEmail {
    on(
        event: 'SendEmail',
        listener: (
            arg: {
                Emails: IMail['Emails'],
                Data: IMail['Data'],
                Type: IMail['Type'],
                Subject: IMail['Subject']
            }
        ) => Promise<void>
    ): this;
    emit(
        event: 'SendEmail',
        arg: {
            Emails: IMail['Emails'],
            Data: IMail['Data'],
            Type: IMail['Type'],
            Subject: IMail['Subject']
        }
    ): boolean;
}

const MailEvent = new Events.EventEmitter();

config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const mail = new SES();

export default MailEvent;

MailEvent.on('SendEmail', async function ({ Emails, Data, Type, Subject }: IMail) {
    const ReadFile = (Template: IMail['Type']): string => Fs.readFileSync(Path.join(__dirname, Template == 'recovery' ? `../Views/${Template}/template.html` : `../Views/${Template}.html`), 'utf-8');

    let Template = handlebars.compile(ReadFile(Type));

    const DataBody = Template(Data);

    try {
        await mail.sendEmail({
            Destination: {
                ToAddresses: Emails
            },
            Message: {
                Body: {
                    Html: {
                        Data: DataBody
                    }
                },
                Subject: {
                    Data: `Artemisa ${Subject}`,
                    Charset: 'UTF-8'
                }
            },
            Source: `Artemisa <${process.env.EMAIL_SOURCE}>`
        }).promise();
        console.log('email sent');
    } catch (error) {
        console.log(error);
    }
});

MailEvent.on('SendRawEmail', async function ({ Emails, Data }: { Emails: string[], Data: { Subject?: string, FullName?: string, sUrl?: string } }): Promise<void> {

    try {
        await mail.sendEmail({
            Destination: {
                ToAddresses: Emails
            },
            Message: {
                Body: {
                    Html: {
                        Data: `
                            <h3>Bienvenido a Artemisa</h3>
                            <br>
                            <br>
                            <p>Por favor, entra al siguiente enlace para actualizar tu contraseña: ${Data.sUrl}</p>
                        `
                    }
                },
                Subject: {
                    Data: `Artemisa ${Data.Subject}`,
                    Charset: 'UTF-8'
                }
            },
            Source: `Artemisa <${process.env.EMAIL_SOURCE}>`
        }).promise();
        console.log('email sent');
    } catch (error) {
        console.log(error);
    }
});