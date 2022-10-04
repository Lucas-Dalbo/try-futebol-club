import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { allResults } from './mocks/allResults';
import { homeResults } from './mocks/homeResults';
import { mockAllMatches, mockAllTeams } from './mocks/leaderBoardMocks';
import Match from '../database/models/MatchModel';
import { awayResults } from './mocks/awayResult';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de leaderboard', () => {
  describe('Rota GET /leaderboard', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(mockAllTeams as Team[]);
      sinon.stub(Match, 'findAll')
        .onCall(0).resolves(mockAllMatches.filter((m) => m.awayTeam === 1 || m.homeTeam === 1) as unknown as Match[])
        .onCall(1).resolves(mockAllMatches.filter((m) => m.awayTeam === 2 || m.homeTeam === 2) as unknown as Match[])
        .onCall(2).resolves(mockAllMatches.filter((m) => m.awayTeam === 3 || m.homeTeam === 3) as unknown as Match[])
        .onCall(3).resolves(mockAllMatches.filter((m) => m.awayTeam === 4 || m.homeTeam === 4) as unknown as Match[])
        .onCall(4).resolves(mockAllMatches.filter((m) => m.awayTeam === 5 || m.homeTeam === 5) as unknown as Match[])
        .onCall(5).resolves(mockAllMatches.filter((m) => m.awayTeam === 6 || m.homeTeam === 6) as unknown as Match[])
        .onCall(6).resolves(mockAllMatches.filter((m) => m.awayTeam === 7 || m.homeTeam === 7) as unknown as Match[])
        .onCall(7).resolves(mockAllMatches.filter((m) => m.awayTeam === 8 || m.homeTeam === 8) as unknown as Match[])
        .onCall(8).resolves(mockAllMatches.filter((m) => m.awayTeam === 9 || m.homeTeam === 9) as unknown as Match[])
        .onCall(9).resolves(mockAllMatches.filter((m) => m.awayTeam === 10 || m.homeTeam === 10) as unknown as Match[])
        .onCall(10).resolves(mockAllMatches.filter((m) => m.awayTeam === 11 || m.homeTeam === 11) as unknown as Match[])
        .onCall(11).resolves(mockAllMatches.filter((m) => m.awayTeam === 12 || m.homeTeam === 12) as unknown as Match[])
        .onCall(12).resolves(mockAllMatches.filter((m) => m.awayTeam === 13 || m.homeTeam === 13) as unknown as Match[])
        .onCall(13).resolves(mockAllMatches.filter((m) => m.awayTeam === 14 || m.homeTeam === 14) as unknown as Match[])
        .onCall(14).resolves(mockAllMatches.filter((m) => m.awayTeam === 15 || m.homeTeam === 15) as unknown as Match[])
        .onCall(15).resolves(mockAllMatches.filter((m) => m.awayTeam === 16 || m.homeTeam === 16) as unknown as Match[])
    })
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna a classificação dos times com status 200', async () => {
      const result = await chai.request(app).get('/leaderboard');
  
      expect(result.body).to.be.deep.equal(allResults);
      expect(result.status).to.be.equal(200);
    });
  });
  
  describe('Rota GET /leaderboard/home', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(mockAllTeams as Team[]);
      sinon.stub(Match, 'findAll')
        .onCall(0).resolves(mockAllMatches.filter((m) => m.homeTeam === 1) as unknown as Match[])
        .onCall(1).resolves(mockAllMatches.filter((m) => m.homeTeam === 2) as unknown as Match[])
        .onCall(2).resolves(mockAllMatches.filter((m) => m.homeTeam === 3) as unknown as Match[])
        .onCall(3).resolves(mockAllMatches.filter((m) => m.homeTeam === 4) as unknown as Match[])
        .onCall(4).resolves(mockAllMatches.filter((m) => m.homeTeam === 5) as unknown as Match[])
        .onCall(5).resolves(mockAllMatches.filter((m) => m.homeTeam === 6) as unknown as Match[])
        .onCall(6).resolves(mockAllMatches.filter((m) => m.homeTeam === 7) as unknown as Match[])
        .onCall(7).resolves(mockAllMatches.filter((m) => m.homeTeam === 8) as unknown as Match[])
        .onCall(8).resolves(mockAllMatches.filter((m) => m.homeTeam === 9) as unknown as Match[])
        .onCall(9).resolves(mockAllMatches.filter((m) => m.homeTeam === 10) as unknown as Match[])
        .onCall(10).resolves(mockAllMatches.filter((m) => m.homeTeam === 11) as unknown as Match[])
        .onCall(11).resolves(mockAllMatches.filter((m) => m.homeTeam === 12) as unknown as Match[])
        .onCall(12).resolves(mockAllMatches.filter((m) => m.homeTeam === 13) as unknown as Match[])
        .onCall(13).resolves(mockAllMatches.filter((m) => m.homeTeam === 14) as unknown as Match[])
        .onCall(14).resolves(mockAllMatches.filter((m) => m.homeTeam === 15) as unknown as Match[])
        .onCall(15).resolves(mockAllMatches.filter((m) => m.homeTeam === 16) as unknown as Match[])
    })
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna a classificação dos times jogando em casa com status 200', async () => {
      const result = await chai.request(app).get('/leaderboard/home');
  
      expect(result.body).to.be.deep.equal(homeResults);
      expect(result.status).to.be.equal(200);
    });
  });
  
  describe('Rota GET /leaderboard/away', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(mockAllTeams as Team[]);
      sinon.stub(Match, 'findAll')
        .onCall(0).resolves(mockAllMatches.filter((m) => m.awayTeam === 1 ) as unknown as Match[])
        .onCall(1).resolves(mockAllMatches.filter((m) => m.awayTeam === 2 ) as unknown as Match[])
        .onCall(2).resolves(mockAllMatches.filter((m) => m.awayTeam === 3 ) as unknown as Match[])
        .onCall(3).resolves(mockAllMatches.filter((m) => m.awayTeam === 4 ) as unknown as Match[])
        .onCall(4).resolves(mockAllMatches.filter((m) => m.awayTeam === 5 ) as unknown as Match[])
        .onCall(5).resolves(mockAllMatches.filter((m) => m.awayTeam === 6 ) as unknown as Match[])
        .onCall(6).resolves(mockAllMatches.filter((m) => m.awayTeam === 7 ) as unknown as Match[])
        .onCall(7).resolves(mockAllMatches.filter((m) => m.awayTeam === 8 ) as unknown as Match[])
        .onCall(8).resolves(mockAllMatches.filter((m) => m.awayTeam === 9 ) as unknown as Match[])
        .onCall(9).resolves(mockAllMatches.filter((m) => m.awayTeam === 10 ) as unknown as Match[])
        .onCall(10).resolves(mockAllMatches.filter((m) => m.awayTeam === 11 ) as unknown as Match[])
        .onCall(11).resolves(mockAllMatches.filter((m) => m.awayTeam === 12 ) as unknown as Match[])
        .onCall(12).resolves(mockAllMatches.filter((m) => m.awayTeam === 13 ) as unknown as Match[])
        .onCall(13).resolves(mockAllMatches.filter((m) => m.awayTeam === 14 ) as unknown as Match[])
        .onCall(14).resolves(mockAllMatches.filter((m) => m.awayTeam === 15 ) as unknown as Match[])
        .onCall(15).resolves(mockAllMatches.filter((m) => m.awayTeam === 16 ) as unknown as Match[])
    })
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna a classificação dos times jogando como visitantes com status 200', async () => {
      const result = await chai.request(app).get('/leaderboard/away');
  
      expect(result.body).to.be.deep.equal(awayResults);
      expect(result.status).to.be.equal(200);
    });
  });
  
  describe('Quando algo da errado em: ', () => {
    before(() => {
      sinon.stub(Team, 'findAll').rejects();
    })
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })
  
    describe('GET /leaderboard', () => {
      it('Retorna "Something went wrong" com status 500', async () => {
        const response = await chai.request(app).get('/leaderboard');
    
        expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
        expect(response.status).to.be.equal(500);
      });
    });
    
    describe('GET /leaderboard/home', () => {
      it('Retorna "Something went wrong" com status 500', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
  
        expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
        expect(response.status).to.be.equal(500);
      });
    });
  
    describe('GET /leaderboard/away', () => {
      it('Retorna "Something went wrong" com status 500', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
  
        expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
        expect(response.status).to.be.equal(500);
      });
    });
  });
})
