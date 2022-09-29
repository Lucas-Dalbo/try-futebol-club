import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { mockOneTeam, mockTeams } from './mocks';

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

  describe('Quando chamada com :id conhecido', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(mockOneTeam as Team);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Retorna o time com status 200', async () => {
      const teamId = 3;
      const response = await chai.request(app).get(`/teams/${teamId}`);

      expect(response.body).to.be.deep.equal({ id: teamId, teamName: "Botafogo" });
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Quando chamada com :id desconhecido', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(null as unknown as Team);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Retorna "Team not found" com status 404', async () => {
      const response = await chai.request(app).get(`/teams/999`);

      expect(response.body).to.be.deep.equal({ message: 'Team not found' });
      expect(response.status).to.be.equal(404);
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