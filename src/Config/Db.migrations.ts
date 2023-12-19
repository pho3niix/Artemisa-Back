import Db from './Db.config';

function Migrations() {
    return (async () => {
        await Db.sync({ alter: true });

        await Db.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);

        console.log('Migration completed.');

        return process.exit(0)
    })();
}

export default Migrations();