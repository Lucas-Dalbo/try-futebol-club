import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota GET /login', () => {
  const mockUser = { email: "ronaldo@fenomeno.com", password: "EuSouRonaldo09" };

  before(async () => {
    sinon.stub(User, "findOne")
      .resolves(mockUser as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub ).restore();
  })

  it('Retorna um Token JWT, quando o usuario é valido', async () => {
    const response = await chai.request(app)
      .get('/login')
      .send(mockUser);

    expect(response.body).to.have.property('token');
    expect(response.status).to.be.equal(200);
  });
});

describe('A rota GET /login', () => {
  const mockUser2 = { email: "messi@messi.com", password: "messiOficial" };

  before(async () => {
    sinon.stub(User, "findOne")
      .resolves(null as unknown as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub ).restore();
  })

  it('Retorna uma mensagem de erro, quando o usuario é invalido', async () => {
    const response = await chai.request(app)
      .get('/login')
      .send(mockUser2);

    expect(response.body).to.be.deep.equal({ message: 'User not found' });
    expect(response.status).to.be.equal(404);
  });
});