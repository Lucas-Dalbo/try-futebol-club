import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { mockInvalidUser, mockValidUser, noEmailUser, noPasswordUser, sendValidUser } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota POST /login', () => {
  describe('Quando recebe um usuário válido', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(mockValidUser as User);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub ).restore();
    })

    it('Retorna um Token JWT com status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(sendValidUser);

      expect(response.body).to.have.property('token');
      expect(response.status).to.be.equal(200);
    });
  })

  describe('Quando o email é invalido', () => {  
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(null as unknown as User);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub ).restore();
    })
  
    it('Retorna uma mensagem de erro com status 401', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(mockInvalidUser);
  
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(response.status).to.be.equal(401);
    });
  });

  describe('Quando o password é invalido', () => {  
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(mockInvalidUser as User);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub ).restore();
    })
  
    it('Retorna uma mensagem de erro com status 401', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(mockInvalidUser);
  
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(response.status).to.be.equal(401);
    });
  });

  describe('Quando o email não é informado', () => {    
    it('Retorna uma mensagem de erro com status 400', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(noEmailUser);
  
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(response.status).to.be.equal(400);
    });
  });

  describe('Quando o password não é informado', () => {    
    it('Retorna uma mensagem de erro com status 400', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(noPasswordUser);
  
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(response.status).to.be.equal(400);
    });
  });
});

