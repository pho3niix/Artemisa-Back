declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'testing' | 'preproduction' | 'production' | 'local' | 'local_prod' | 'local_dev' | 'local_qa' | 'local_alfa' | 'supertest';
        PROJECT_NAME: string;
        PG_CONNECTION_LOCAL: string;
        PG_SCHEMA_LOCAL: string;
        PG_CONNECTION_SUPERTEST: string;
        PG_SCHEMA: string;
        PG_CONNECTION_DEVELOPMENT: string;
        PG_CONNECTION_QA: string;
        PG_CONNECTION_ALPHA: string;
        PG_CONNECTION_PRODUCTION: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
        EMAIL_SOURCE: string;
        AWS_BUCKET_IMAGES: string;
        AWS_BUCKET_FILES: string;
        AWS_BUCKET_PUBLIC_IMAGES: string;
        NODE_PORT: string;
        JWT_SECRET: string;
        AES_SECRET: string;
        JWT_ALGORITHM: string;
        HOME_PAGE: string;
        SECRET_SAVE_ADMIN_KEY: string;
        SECRET_DEV_KEY: string;
        SECRET_API_KEY: string;
        SERVER: string;
    }
}