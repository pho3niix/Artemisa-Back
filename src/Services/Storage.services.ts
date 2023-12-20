import Messages from '../Utils/ValidationError.util';
import { MyError } from '../Api/00_Index/Index.middlewares';
import AWS, { S3 } from 'aws-sdk';
import Sharp from 'sharp';
import Crypto from 'crypto';
import ApiMessages from '../Api/00_Index/Index.messages';

export interface IListImages {
    Type: string;
    Url: string;
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
    ImageKey: string;
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

    public GetFormat(mime: string): string {
        return mime.split('/')[1]
    }

    public async ValidateImages({
        Files,
        Type,
        Format,
        Lang
    }: {
        Files: any,
        Type: 'image' | 'document',
        Format: string
        Lang: string
    }): Promise<any> {
        const FilesData = Files;

        if (!FilesData) return Promise.reject(new MyError(404, ApiMessages.UploadImages.fileNotFound[Lang]));

        const Upload: any = Type == 'image' ? Files.oImage : Files.oFile;

        if (!Upload) return Promise.reject(new MyError(409, ApiMessages.UploadImages.fileNameNotFound[Lang]));

        let FormatData: string = null;

        switch (Type) {
            case 'image':
                Format = this.CheckImagesFormat({
                    Type: Upload.mimetype,
                    Format: Format as string
                });
                break;
            case 'document':
                Format = this.CheckImagesFormat({
                    Type: Upload.mimetype,
                    Format: Format as string
                });
                break;
        }

        if (!FormatData) return Promise.reject(new MyError(412, Messages.Middleware.invalidFile[Lang]));

        return Upload
    }

    public async ValidateArrayOfImages({
        aFiles,
        Type,
        Format,
        Lang
    }: {
        aFiles: any,
        Type: 'image' | 'document',
        Format: string,
        Lang: 'sp' | 'en'
    }) {
        const Files = Type == 'image' ? aFiles.oImage : aFiles.oFile;

        const Upload: { file: any, format: boolean }[] = Files.map((e: any) => {
            let Params = { file: e, format: true }
            if (!e) return Params.format = false;
            return Params;
        });

        if (Upload.map(e => e.format).includes(false)) return Promise.reject(new MyError(409, ApiMessages.UploadImages.fileNameNotFound[Lang]));

        const FormatData = Upload.map(e => {
            let Params = e
            switch (Type) {
                case 'image':
                    Params.format = typeof this.CheckImagesFormat({
                        Type: e.file.mimetype,
                        Format: Format as string
                    }) == 'string' ? true : false
                    break;
                case 'document':
                    Params.format = typeof this.CheckDocumentFormat({
                        Type: e.file.mimetype,
                        Format: Format as string
                    }) == 'string' ? true : false
                    break;
            }
            return Params;
        });

        if (FormatData.map(e => e.format).includes(false)) return Promise.reject(new MyError(412, Messages.Middleware.invalidFile[Lang]));

        return Format;
    }

    public CheckDocumentFormat({ Type, Format }: { Type?: string; Format: string }): string {
        let Response: string = null;
        if (Type === 'application/pdf') return 'pdf';
        if (Type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
        if (Type === 'application/octet-stream') return this.CheckDocumentFormat({ Format });
        if (Type === 'application/msword') return 'doc';
        return Response;
    }

    public CheckImagesFormat({ Type, Format }: { Type?: string; Format: string }): string {
        let Response: string = null;
        if (Type === 'image/jpeg') return 'jpeg';
        if (Type === 'image/png') return 'png';
        if (Type === 'application/octet-stream') return this.CheckImagesFormat({ Format });
        if (Type === 'image/tiff') return 'tiff';
        return Response;
    }

    public UploadFile({
        Data,
        Path,
        sMime,
        Format
    }): Promise<string> {
        return new Promise((resolve, reject) => {
            const File: string = this.CheckDocumentFormat({ Type: sMime, Format });

            const Key: string = `${Path}/${Crypto.pseudoRandomBytes(16).toString('hex')}.${File}`;

            const Params: IUploadParams = {
                Bucket: process.env.AWS_BUCKET_FILES,
                Key,
                Body: Data,
                ContentType: Format != null ? Format : sMime
            };

            s3.upload(Params, (err: Error, resp: any) => {
                if (err) reject(err);
                console.log(resp);
            });
            return resolve(Key);
        })
    }

    public DeleteFile({ ImageKey }: IImage): void {
        const Params: IBaseParams = {
            Bucket: process.env.AWS_BUCKET_FILES,
            Key: ImageKey
        };
        s3.deleteObject(Params, (err: Error, res: any) => {
            if (err) console.log(err);
            else console.log('successfully deleted')
        })
    }

    public DeleteImage({ ImageKey }: IImage): void {
        const Params: IBaseParams = {
            Bucket: process.env.AWS_BUCKET_IMAGES,
            Key: ImageKey
        };
        s3.deleteObject(Params, (err: Error, res: any) => {
            if (err) console.log(err);
            else console.log('successfully deleted')
        })
    }

    public GetFiles({ ImageKey }: IImage): Promise<string> {
        return new Promise((resolve, reject) => {
            if (ImageKey) {
                const Params: IGetParams = {
                    Bucket: process.env.AWS_BUCKET_FILES,
                    Key: ImageKey,
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

    private async UploadImage(Key: string, Data: any, oSize: { Type: string, iWidth: number }): Promise<AWS.S3.ManagedUpload.SendData> {
        return new Promise((resolve, reject) => {
            Sharp(Data)
                .resize({
                    width: oSize.iWidth
                })
                .withMetadata()
                .toFormat('jpg')
                .toBuffer()
                .then(data => {
                    const Params: AWS.S3.PutObjectRequest = {
                        Bucket: process.env.AWS_BUCKET_IMAGES,
                        Key: `${Key}-${oSize.Type}.jpg`,
                        Body: data,
                        ContentType: 'image/jpeg'
                    };
                    s3.upload(Params, (err: Error, Data: AWS.S3.ManagedUpload.SendData) => {
                        console.log(Data)
                        resolve(Data)
                    })
                })
                .catch(e => console.log('aquí falla', e));
        })
    }

    public async UploadManyImages({
        Data,
        Path
    }: { Data: any, Path: string }): Promise<string> {
        const Sizes: { Type: string, iWidth: number }[] = [
            { Type: 'xs', iWidth: 90 },
            { Type: 'sm', iWidth: 150 },
            { Type: 'md', iWidth: 300 },
            { Type: 'lg', iWidth: 612 },
            { Type: 'xlg', iWidth: 1080 },
        ];

        return await new Promise(async (resolve, reject) => {
            const Key = `${Path}/${Crypto.pseudoRandomBytes(16).toString('hex')}`;
            await Promise.all(Sizes.map(async i => {
                await this.UploadImage(Key, Data, i);
            }));
            resolve(Key);
        });
    }

    public async GetManyImages(Path: string, aSizes: string[]): Promise<oImages> {
        let build = {};
        for (let i of await this.GetImagesSizes(Path, aSizes)) {
            build[i.Type] = i.Url;
        }
        return Path != null ? build : {};
    }

    public async GetImages(ImageKey: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (ImageKey) {
                s3.getSignedUrl('getObject', { Bucket: process.env.AWS_BUCKET_IMAGES, Key: ImageKey, Expires: 219000000 }, (err: Error, url: string) => {
                    if (err) return reject(new MyError(422, err.message));
                    return resolve(url);
                })
            } else {
                return resolve('0');
            }
        })
    }

    public async GetImagesSizes(Path: string, aSizes: string[]): Promise<IListImages[]> {
        if (Path) {
            const Images: IListImages[] = await Promise.all(aSizes.map(async e => {
                return {
                    Type: e,
                    Url: await this.GetImages(`${Path}-${e}.jpg`),
                    // Key: `${ImageKey}-${e}`
                }
            }))
            return Images;
        } else {
            return [];
        }
    }

};

export default new StorageMethods();