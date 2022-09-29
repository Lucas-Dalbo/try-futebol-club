import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { mockTeams } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota GET /teams', () => {
  describe('Quando chamada sem :id', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
    })

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Retorna uma lista com todos os times com status 200', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Quando ocorre um erro interno', () => {
    before(() => {
      sinon.stub(Team, 'findAll').rejects();
    })

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Retorna "Something went wrong" com status 500', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
      expect(response.status).to.be.equal(500);
    });
  });
});