require("dotenv").config({ path: ".env" });
import { Sequelize } from 'sequelize';

const Environments = {
    preproduction: process.env.PG_CONNECTION_ALPHA,
    production: process.env.PG_CONNECTION_PRODUCTION,
    testing: process.env.PG_CONNECTION_QA,
    development: process.env.PG_CONNECTION_DEVELOPMENT,
    local: process.env.PG_CONNECTION_LOCAL,
    supertest: process.env.PG_CONNECTION_SUPERTEST
};

const Default = process.env.PG_CONNECTION_DEVELOPMENT;

const sequelize = new Sequelize(Environments[process.env.NODE_ENV] ?? Default, {
    logging: process.env.NODE_ENV.includes('local'),
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate()
        return console.log('Database is running and ready to work.')
    } catch (error) {
        return console.log('Unable to connect database.')
    }
})();

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