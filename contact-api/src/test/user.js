const chai = require('chai');
const server = require('../../bin/server');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('User', () => {

    it('Deve retornar erro 400 no cadastro, sem name, email e password: POST /', (done) => {
        chai.request(server).post('/users')
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve retornar erro 400 no cadastro, sem name: POST /', (done) => {
        chai.request(server).post('/users')
            .send({
                email: "testeunitario@gmail.com",
                password: "testeunitario"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve retornar erro 400 no cadastro, sem email: POST /', (done) => {
        chai.request(server).post('/users')
            .send({
                name: "Teste Unitário",
                password: "testeunitario"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve retornar erro 400 no cadastro, sem password: POST /', (done) => {
        chai.request(server).post('/users')
            .send({
                name: "Teste Unitário",
                email: "testeunitario@gmail.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve cadastrar um novo usuário: POST /', (done) => {
        chai.request(server).post('/users')
            .send({
                name: "Teste Unitário",
                email: "testeunitario@gmail.com",
                password: "testeunitario"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('data');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('password');
                res.body.data.email.should.be.equal('testeunitario@gmail.com');
                res.body.data.password.should.be.equal('testeunitario');
                res.body.should.have.property('message');
                res.body.message.should.be.equal('Usuário cadastrado com sucesso');
                done();
            });
    });

    it('Deve retornar erro 404 ao autenticar um usuário, password errado: POST /', (done) => {
        chai.request(server).post('/users/authenticate')
        .send({
            email: "testeunitario@gmail.com",
            password: "testeunitarioerrado"
        })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('Deve retornar erro 404 ao autenticar um usuário, email errado: POST /', (done) => {
        chai.request(server).post('/users/authenticate')
        .send({
            email: "testeunitarioerrado@gmail.com",
            password: "testeunitario"
        })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('Deve autenticar um usuário: POST /', (done) => {
        chai.request(server).post('/users/authenticate')
            .send({
                email: "testeunitario@gmail.com",
                password: "testeunitario"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('name');
                res.body.data.email.should.be.equal('testeunitario@gmail.com');
                res.body.data.name.should.be.equal('Teste Unitário');
                res.body.should.have.property('token');
                done();
            });
    });
});
