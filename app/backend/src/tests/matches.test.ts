import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { mockMatches } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota GET /matches', () => {
  describe('Ao ser chamada sem query string', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(mockMatches as unknown as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  })

  it('Retorna uma lista de matches com status 200', async () => {
    const result = await chai.request(app).get('/matches');

    expect(result.body).to.be.an('array');
    expect(result.status).to.be.equal(200);
  })

  describe('Quando ocorre um erro interno', () => {
    before(() => {
      sinon.stub(Match, 'findAll').rejects();
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Retorna "Something went wrong" com status 500', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
      expect(response.status).to.be.equal(500);
    });
  });
});