const chai = require('chai');
const server = require('../../bin/server');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Contact', () => {
    let email;
    let password;
    let token;

    it('Deve cadastrar um novo contato: POST /', (done) => {

        // cria um usuário
        chai.request(server).post('/users')
            .send({
                name: "Usuário ",
                email: "usuario@gmail.com",
                password: "uauario"
            })
            .end((err, res) => {
                res.should.have.status(201);
                this.email = res.body.data.email;
                this.password = res.body.data.password;

                // autentica o usuário criado
                chai.request(server).post('/users/authenticate')
                    .send({
                        email: this.email,
                        password: this.password
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        this.token = res.body.token;

                        // insere um contato
                        chai.request(server).post('/contacts').set('x-access-token', this.token)
                            .send({
                                name: "Contato Finosa",
                                email: "contatofinosa@gmail.com",
                                twitter: "@contatofinosa",
                                phone: "123123123"
                            })
                            .end((err, res) => {
                                res.should.have.status(201);
                                res.body.should.have.property('data');
                                res.body.data.should.have.property('id');
                                res.body.should.have.property('message');
                                res.body.message.should.be.equal('Contato cadastrado com sucesso');
                                done();
                            });
                    });
            });
    });

    it('Deve alterar contato: PATCH /', (done) => {

        // cria um usuário
        chai.request(server).post('/users')
            .send({
                name: "Usuário",
                email: "usuario@gmail.com",
                password: "usuario"
            })
            .end((err, res) => {
                res.should.have.status(201);
                this.email = res.body.data.email;
                this.password = res.body.data.password;

                // autentica o usuário criado
                chai.request(server).post('/users/authenticate')
                    .send({
                        email: this.email,
                        password: this.password
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        this.token = res.body.token;

                        // insere um usuário
                        chai.request(server).post('/contacts').set('x-access-token', this.token)
                            .send({
                                name: "Contato Finosa",
                                email: "contatofinosa@gmail.com",
                                twitter: "@contatofinosa",
                                phone: "123123123"
                            })
                            .end((err, res) => {
                                res.should.have.status(201);

                                // atualiza um contato
                                chai.request(server).patch('/contacts/' + res.body.data.id).set('x-access-token', this.token)
                                    .send({
                                        name: "Contato Alterado",
                                        email: "contatoalterado@gmail.com",
                                        phone: "65484153"
                                    })
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.have.property('message');
                                        res.body.message.should.be.equal('Contato atualizado com sucesso');
                                        done();
                                    });
                            });
                    });
            });
    });

    it('Deve deletar um contato: DELETE /', (done) => {

        // cria um usuário
        chai.request(server).post('/users')
            .send({
                name: "Usuário",
                email: "usuario@gmail.com",
                password: "usuario"
            })
            .end((err, res) => {
                res.should.have.status(201);
                this.email = res.body.data.email;
                this.password = res.body.data.password;

                // autentica o usuário criado
                chai.request(server).post('/users/authenticate')
                    .send({
                        email: this.email,
                        password: this.password
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        this.token = res.body.token;

                        // insere um usuário
                        chai.request(server).post('/contacts').set('x-access-token', this.token)
                            .send({
                                name: "Contato Finosa",
                                email: "contatofinosa@gmail.com",
                                twitter: "@contatofinosa",
                                phone: "123123123"
                            })
                            .end((err, res) => {
                                res.should.have.status(201);

                                // exclui um contato
                                chai.request(server).delete('/contacts/' + res.body.data.id).set('x-access-token', this.token)
                                    .send({})
                                    .end((err, res) => {
                                        res.should.have.status(204);
                                        done();
                                    });
                            });
                    });
            });
    });

    it('Deve buscar um contato: GET /', (done) => {

        // cria um usuário
        chai.request(server).post('/users')
            .send({
                name: "Usuário",
                email: "usuario@gmail.com",
                password: "usuario"
            })
            .end((err, res) => {
                res.should.have.status(201);
                this.email = res.body.data.email;
                this.password = res.body.data.password;

                // autentica o usuário criado
                chai.request(server).post('/users/authenticate')
                    .send({
                        email: this.email,
                        password: this.password
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        this.token = res.body.token;

                        // insere um usuário
                        chai.request(server).post('/contacts').set('x-access-token', this.token)
                            .send({
                                name: "Contato Finosa",
                                email: "contatofinosa@gmail.com",
                                twitter: "@contatofinosa",
                                phone: "123123123"
                            })
                            .end((err, res) => {
                                res.should.have.status(201);

                                // busca um contato
                                chai.request(server).get('/contacts/' + res.body.data.id).set('x-access-token', this.token)
                                    .send({})
                                    .end((err, res) => {
                                        // console.log(res);
                                        res.should.have.status(200);
                                        res.should.have.property('body');
                                        res.body.should.have.property('name');
                                        res.body.should.have.property('email');
                                        res.body.should.have.property('twitter');
                                        res.body.should.have.property('phone');
                                        res.body.name.should.be.equal('Contato Finosa');
                                        res.body.email.should.be.equal('contatofinosa@gmail.com');
                                        res.body.twitter.should.be.equal('@contatofinosa');
                                        res.body.phone.should.be.equal(123123123);
                                        done();
                                    });
                            });
                    });
            });
    });
});
