require("dotenv").config({ path: ".env" });
import Database from '../../Config/Db.config';
import Super from 'supertest';
import Chai, { expect } from 'chai';
const Expect = Chai.expect;
import Server from '../../Server';
import Users from '../../Models/Users.model';

function BaseRoute(module: string): string {
    return `/api/v1/sp/${module}`;
}

/**Method - Service title */
describe(`GET Super Users list`, () => {
    after(async () => {
        await Database.sync({ force: true });

        Promise.resolve();
    });

    before(async () => {

    })

    context('User list respond with 200 (success)', async () => {
        it('With correct params', async () => {
            const Response = await Super(Server).get(BaseRoute('users')).set('x-api-key', process.env.SECRET_API_KEY);

            Expect(Response.status).to.equal(200);
            Expect(Response.body.results).to.be.an('array');
            Expect(Response.body.message).to.be.an('string');

            Promise.resolve();
        })
    })
})