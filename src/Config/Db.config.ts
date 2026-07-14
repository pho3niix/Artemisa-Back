require("dotenv").config({ path: ".env" });
import { Sequelize } from 'sequelize';
import { Pool } from 'pg';

const Environments = {
    preproduction: process.env.PG_CONNECTION_ALPHA,
    production: process.env.PG_CONNECTION_PRODUCTION,
    testing: process.env.PG_CONNECTION_QA,
    development: process.env.PG_CONNECTION_DEVELOPMENT,
    local: process.env.PG_CONNECTION_LOCAL,
    supertest: process.env.PG_CONNECTION_SUPERTEST
};

let sequelize = null;

switch (process.env.NODE_ENV) {
    case 'development' || 'preproduction' || 'production' || 'testing' || 'supertest':
        sequelize = new Sequelize(Environments[process.env.NODE_ENV], {
            logging: false,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Permite conectar a AWS RDS sin validar certificado estricto
                }
            }
        });
        break;
    case 'local':
        sequelize = new Sequelize(Environments[process.env.NODE_ENV], {
            logging: true,
            dialect: 'postgres'
        });
        break;
}

(async () => {
    try {
        await sequelize.authenticate();
        return console.log('Database is running and ready to work.');
    } catch (error) {
        return console.log('Unable to connect database.');
    }
});

let pool = null;

switch (process.env.ENV) {
    case 'development' || 'preproduction' || 'production' || 'testing' || 'supertest':
        pool = new Pool({
            connectionString: Environments[process.env.NODE_ENV],
            ssl: {
                rejectUnauthorized: false
            }
        });
        break;
    case 'local':
        pool = new Pool({
            connectionString: Environments[process.env.NODE_ENV]
        });
        break;
}

async function query(text: string) {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('Executing query:', text)

            const Client = await pool.connect();

            await Client.query('set search_path to "public"');

            const Response = await Client.query(text);

            resolve(Response.rows)

            Client.release();
        } catch (error) {
            reject({
                message: error.message,
                error
            });
        }
    })
}

export function SelectJsonData(ParsedJson: Array<any>, Elements: Array<string>) {
    const Stringify = JSON.stringify(ParsedJson);
    const Columns = Elements.map(e => {
        switch (true) {
            case e.includes('Id'):
                if (e.includes('TaxId') || e.includes('FolioId')) {
                    return `jsonb_array_elements(j)->>'${e}' as "${e}"`
                } else {
                    return `(jsonb_array_elements(j)->>'${e}')::uuid as "${e}"`
                }
            case e.charAt(0) == 'd' || e.charAt(0) == 'i':
                return `(jsonb_array_elements(j)->>'${e}')::numeric as "${e}"`
            default:
                return `jsonb_array_elements(j)->>'${e}' as "${e}"`
        }
    });
    const Query = `select ${Columns.join(',')}
  from (
      select '${Stringify}'::jsonb as j
  ) t`;
    return Query
}

export default sequelize;