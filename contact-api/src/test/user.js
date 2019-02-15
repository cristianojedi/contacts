const chai = require('chai');
const server = require('../../bin/server');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API', () => {

    it('Deve cadastrar um novo usuário: Response - POST /', (done) => {
        chai.request(server).post('/users')
            .send({
                name: "Teste Unitário",
                email: "testeunitario@gmail.com",
                password: "testeunitario"
            })
            .end((err, res) => {
                console.log(res);
                expect(res).to.have.status(201);
                // expect(res.body).to.be.a('object');
                // expect(res.body.ok).to.be.an("string");
                // expect(res.body.ok).to.be.equal("teste");
                done();
            });
    });

    // it('Check Status - GET /', (done) => {
    //     chai.request(app).get('/')
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.a('object');
    //             expect(res.body.ok).to.be.an('boolean');
    //             expect(res.body.ok).to.be.equal(true);
    //             done();
    //         });
    // });

    // it('Check Response - POST /', (done) => {
    //     chai.request(app).post('/')
    //         .send({ text: "teste" })
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.a('object');
    //             expect(res.body.ok).to.be.an("string");
    //             expect(res.body.ok).to.be.equal("teste");
    //             done();
    //         });
    // });

    // it('Error 500 - POST /', (done) => {
    //     chai.request(app).post('/').send({})
    //         .end((err, res) => {
    //             expect(res).to.have.status(500);
    //             done();
    //         });
    // });

    // it('Should give a 404 - GET /not-found', (done) => {
    //     chai.request(app).get('/not-found')
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             done();
    //         });
    // });
});