import Messages from '../Utils/ValidationError.util';
import { MyError } from '../Api/00_Index/Index.middlewares';
import AWS, { S3 } from 'aws-sdk';
import Sharp from 'sharp';
import Crypto from 'crypto';
import ApiMessages from '../Api/00_Index/Index.messages';

export interface IListImages {
    sType: string;
    sUrl: string;
}

export interface oImages {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xlg?: string;
}

interface IBaseParams {
    Bucket: string;
    Key: string;
}

export interface IImage {
    sImageKey: string;
}

interface IUploadParams extends IBaseParams {
    Body: any;
    ContentType: string;
}

interface IGetParams extends IBaseParams {
    Expires: number;
}

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3: S3 = new AWS.S3({});

class StorageMethods {

    public GetFormat(mime:string):string{
        return mime.split('/')[1]
    }

    public async ValidateImages({
        oFiles,
        sType,
        sFormat,
        sLang
    }: {
        oFiles: any,
        sType: 'image' | 'document',
        sFormat: string
        sLang: string
    }): Promise<any> {
        const Files = oFiles;

        if (!Files) return Promise.reject(new MyError(404, ApiMessages.UploadImages.fileNotFound[sLang]));

        const Upload: any = sType == 'image' ? Files.oImage : Files.oFile;

        if (!Upload) return Promise.reject(new MyError(409, ApiMessages.UploadImages.fileNameNotFound[sLang]));

        let Format: string = null;

        switch (sType) {
            case 'image':
                Format = this.CheckImagesFormat({
                    sType: Upload.mimetype,
                    sFormat: sFormat as string
                });
                break;
            case 'document':
                Format = this.CheckImagesFormat({
                    sType: Upload.mimetype,
                    sFormat: sFormat as string
                });
                break;
        }

        if (!Format) return Promise.reject(new MyError(412, Messages.Middleware.invalidFile[sLang]));

        return Upload
    }

    public async ValidateArrayOfImages({
        aFiles,
        sType,
        sFormat,
        sLang
    }: {
        aFiles: any,
        sType: 'image' | 'document',
        sFormat: string,
        sLang: 'sp' | 'en'
    }) {
        const Files = sType == 'image' ? aFiles.oImage : aFiles.oFile;

        const Upload: { file: any, format: boolean }[] = Files.map((e: any) => {
            let Params = { file: e, format: true }
            if (!e) return Params.format = false;
            return Params;
        });

        if (Upload.map(e => e.format).includes(false)) return Promise.reject(new MyError(409, ApiMessages.UploadImages.fileNameNotFound[sLang]));

        const Format = Upload.map(e => {
            let Params = e
            switch (sType) {
                case 'image':
                    Params.format = typeof this.CheckImagesFormat({
                        sType: e.file.mimetype,
                        sFormat: sFormat as string
                    }) == 'string' ? true : false
                    break;
                case 'document':
                    Params.format = typeof this.CheckDocumentFormat({
                        sType: e.file.mimetype,
                        sFormat: sFormat as string
                    }) == 'string' ? true : false
                    break;
            }
            return Params;
        });

        if (Format.map(e => e.format).includes(false)) return Promise.reject(new MyError(412, Messages.Middleware.invalidFile[sLang]));

        return Format;
    }

    public CheckDocumentFormat({ sType, sFormat }: { sType?: string; sFormat: string }): string {
        let Response: string = null;
        if (sType === 'application/pdf') return 'pdf';
        if (sType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
        if (sType === 'application/octet-stream') return this.CheckDocumentFormat({ sFormat });
        if (sType === 'application/msword') return 'doc';
        return Response;
    }

    public CheckImagesFormat({ sType, sFormat }: { sType?: string; sFormat: string }): string {
        let Response: string = null;
        if (sType === 'image/jpeg') return 'jpeg';
        if (sType === 'image/png') return 'png';
        if (sType === 'application/octet-stream') return this.CheckImagesFormat({ sFormat });
        if (sType === 'image/tiff') return 'tiff';
        return Response;
    }

    public UploadFile({
        aData,
        sPath,
        sMime,
        sFormat
    }): Promise<string> {
        return new Promise((resolve, reject) => {
            const File: string = this.CheckDocumentFormat({ sType: sMime, sFormat });

            const Key: string = `${sPath}/${Crypto.pseudoRandomBytes(16).toString('hex')}.${File}`;

            const Params: IUploadParams = {
                Bucket: process.env.AWS_BUCKET_FILES,
                Key,
                Body: aData,
                ContentType: sFormat != null ? sFormat : sMime
            };

            s3.upload(Params, (err: Error, resp: any) => {
                if (err) reject(err);
                console.log(resp);
            });
            return resolve(Key);
        })
    }

    public DeleteFile({ sImageKey }: IImage): void {
        const Params: IBaseParams = {
            Bucket: process.env.AWS_BUCKET_FILES,
            Key: sImageKey
        };
        s3.deleteObject(Params, (err: Error, res: any) => {
            if (err) console.log(err);
            else console.log('successfully deleted')
        })
    }

    public DeleteImage({ sImageKey }: IImage): void {
        const Params: IBaseParams = {
            Bucket: process.env.AWS_BUCKET_IMAGES,
            Key: sImageKey
        };
        s3.deleteObject(Params, (err: Error, res: any) => {
            if (err) console.log(err);
            else console.log('successfully deleted')
        })
    }

    public GetFiles({ sImageKey }: IImage): Promise<string> {
        return new Promise((resolve, reject) => {
            if (sImageKey) {
                const Params: IGetParams = {
                    Bucket: process.env.AWS_BUCKET_FILES,
                    Key: sImageKey,
                    Expires: 219000000
                }
                s3.getSignedUrl('getObject', Params, (err: Error, url: string) => {
                    if (err) return reject(new MyError(422, err.message));
                    return resolve(url)
                })
            } else {
                return resolve(null);
            }
        })
    }

    private async UploadImage(sKey: string, aData: any, oSize: { sType: string, iWidth: number }): Promise<AWS.S3.ManagedUpload.SendData> {
        return new Promise((resolve, reject) => {
            Sharp(aData)
                .resize({
                    width: oSize.iWidth
                })
                .withMetadata()
                .toFormat('jpg')
                .toBuffer()
                .then(data => {
                    const Params: AWS.S3.PutObjectRequest = {
                        Bucket: process.env.AWS_BUCKET_IMAGES,
                        Key: `${sKey}-${oSize.sType}.jpg`,
                        Body: data,
                        ContentType: 'image/jpeg'
                    };
                    s3.upload(Params, (err: Error, Data: AWS.S3.ManagedUpload.SendData) => {
                        console.log(Data)
                        resolve(Data)
                    })
                })
                .catch(e => console.log('aquí falla',e));
        })
    }

    public async UploadManyImages({
        aData,
        sPath
    }: { aData: any, sPath: string }): Promise<string> {
        const Sizes: { sType: string, iWidth: number }[] = [
            { sType: 'xs', iWidth: 90 },
            { sType: 'sm', iWidth: 150 },
            { sType: 'md', iWidth: 300 },
            { sType: 'lg', iWidth: 612 },
            { sType: 'xlg', iWidth: 1080 },
        ];

        return await new Promise(async (resolve, reject) => {
            const Key = `${sPath}/${Crypto.pseudoRandomBytes(16).toString('hex')}`;
            await Promise.all(Sizes.map(async i => {
                await this.UploadImage(Key, aData, i);
            }));
            resolve(Key);
        });
    }

    public async GetManyImages(sPath: string, aSizes: string[]): Promise<oImages> {
        let build = {};
        for (let i of await this.GetImagesSizes(sPath, aSizes)) {
            build[i.sType] = i.sUrl;
        }
        return sPath != null ? build : {};
    }

    public async GetImages(sImageKey: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (sImageKey) {
                s3.getSignedUrl('getObject', { Bucket: process.env.AWS_BUCKET_IMAGES, Key: sImageKey, Expires: 219000000 }, (err: Error, url: string) => {
                    if (err) return reject(new MyError(422, err.message));
                    return resolve(url);
                })
            } else {
                return resolve('0');
            }
        })
    }

    public async GetImagesSizes(sPath: string, aSizes: string[]): Promise<IListImages[]> {
        if (sPath) {
            const Images: IListImages[] = await Promise.all(aSizes.map(async e => {
                return {
                    sType: e,
                    sUrl: await this.GetImages(`${sPath}-${e}.jpg`),
                    // sKey: `${sImageKey}-${e}`
                }
            }))
            return Images;
        } else {
            return [];
        }
    }

};

export default new StorageMethods();