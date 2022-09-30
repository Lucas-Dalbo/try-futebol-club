import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { mockToken, roleUser } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota GET /login/validate', () => {
  describe('Quando recebe um token válido', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(roleUser as User);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub ).restore();
    })

    it('Retorna a role da pessoa usuária com status 200', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', mockToken);

      expect(response.body).to.be.deep.equal({ role: roleUser.role });
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Quando recebe um token invalido', () => {
    it('Retorna "Invalid token" com status 401', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', 'mockToken');

      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token'});
      expect(response.status).to.be.equal(401);
    });
  });

  describe('Quando não recebe um token', () => {
    it('Retorna "Token must be a valid token" com status 401', async () => {
      const response = await chai.request(app)
        .get('/login/validate');

      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      expect(response.status).to.be.equal(401);
    });
  });

  describe('Quando ocorre um erro interno', () => {
    before(() => {
      sinon.stub(User, 'findOne').rejects();
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Retorna "Something went wrong" com status 500', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', mockToken);

      expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
      expect(response.status).to.be.equal(500);
    });
  });
});