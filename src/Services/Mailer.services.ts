import Events from 'events';
import Fs from 'fs';
import Path from 'path';
import { SES, config } from 'aws-sdk';
import handlebars from 'handlebars';

interface IMailTypes {
    sType: 'welcome' | 'recovery' | 'password';
}

interface IMail {
    aEmails: any[],
    oData: any,
    sType: IMailTypes['sType'],
    sSubject: string
}

interface ISendEmail {
    on(
        event: 'SendEmail',
        listener: (
            arg: {
                aEmails: IMail['aEmails'],
                oData: IMail['oData'],
                sType: IMail['sType'],
                sSubject: IMail['sSubject']
            }
        ) => Promise<void>
    ): this;
    emit(
        event: 'SendEmail',
        arg: {
            aEmails: IMail['aEmails'],
            oData: IMail['oData'],
            sType: IMail['sType'],
            sSubject: IMail['sSubject']
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

MailEvent.on('SendEmail', async function ({ aEmails, oData, sType, sSubject}: IMail) {
    const ReadFile = (Template: IMail['sType']): string => Fs.readFileSync(Path.join(__dirname, Template == 'recovery' ? `../Views/${Template}/template.html` : `../Views/${Template}.html`), 'utf-8');

    let Template = handlebars.compile(ReadFile(sType));

    const Data = Template(oData);

    try {
        await mail.sendEmail({
            Destination: {
                ToAddresses: aEmails
            },
            Message: {
                Body: {
                    Html: {
                        Data
                    }
                },
                Subject: {
                    Data: `CRVG ${sSubject}`,
                    Charset: 'UTF-8'
                }
            },
            Source: `CRVG <${process.env.EMAIL_SOURCE}>`
        }).promise();
        console.log('email sent');
    } catch (error) {
        console.log(error);
    }
});

MailEvent.on('SendRawEmail', async function ({ aEmails, oData }: { aEmails: string[], oData: { sSubject?: string, sFullName?: string, sUrl?: string } }): Promise<void> {

    try {
        await mail.sendEmail({
            Destination: {
                ToAddresses: aEmails
            },
            Message: {
                Body: {
                    Html: {
                        Data: `
                            <h3>Bienvenido a CRVG</h3>
                            <br>
                            <br>
                            <p>Por favor, entra al siguiente enlace para actualizar tu contraseña: ${oData.sUrl}</p>
                        `
                    }
                },
                Subject: {
                    Data: `CRVG ${oData.sSubject}`,
                    Charset: 'UTF-8'
                }
            },
            Source: `CRVG <${process.env.EMAIL_SOURCE}>`
        }).promise();
        console.log('email sent');
    } catch (error) {
        console.log(error);
    }
});