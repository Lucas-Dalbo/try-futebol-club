import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { mockInvalidMatch, mockInvalidMatchTeams, mockMatches, mockNewMatch, mockNewMatchGoals, mockOneTeam, mockToken, mockUpdateMatch, mockValidMatch, mockValidMatchNoGoals } from './mocks';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('A rota GET /matches', () => {
  describe('Ao ser chamada sem query string', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(mockMatches as unknown as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Retorna uma lista de matches com status 200', async () => {
      const result = await chai.request(app).get('/matches');
  
      expect(result.body).to.be.an('array');
      expect(result.status).to.be.equal(200);
    })
  });

  describe('Ao ser chamada com a query ?inProgress=true', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves([mockMatches[1]] as unknown as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Retorna uma lista de matches "inProgress: true" com status 200', async () => {
      const result = await chai.request(app).get('/matches?inProgress=true');
  
      const everyProgressIsTrue = result.body.every((match: { inProgress: boolean; }) => match.inProgress === true);
  
      expect(result.body).to.be.an('array');
      expect(everyProgressIsTrue).to.be.equal(true);
      expect(result.status).to.be.equal(200);
    });
  });

  describe('Ao ser chamada com a query ?inProgress=false', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves([mockMatches[0]] as unknown as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Retorna uma lista de matches "inProgress: false" com status 200', async () => {
      const result = await chai.request(app).get('/matches?inProgress=false');
  
      const everyProgressIsFalse = result.body.every((match: { inProgress: boolean; }) => match.inProgress === false);
  
      expect(result.body).to.be.an('array');
      expect(everyProgressIsFalse).to.be.equal(true);
      expect(result.status).to.be.equal(200);
    });
  });

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

describe('A rota POST /matches', () => {
  describe('Ao ser chamada com HomeTeam ou AwayTeam invalido', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(null as unknown as Match);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna mensagem de erro com status 404', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', mockToken)
        .send(mockInvalidMatchTeams);

      expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
      expect(response.status).to.be.equal(404);
    })
  });

  describe('Ao ser chamada com dados validos', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(mockOneTeam as Team);
      sinon.stub(Match, 'create').resolves(mockNewMatch as Match);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('Retorna os dados da partida adicionada com status 201', async () => {
      const response = await chai.request(app)
      .post('/matches')
      .set('authorization', mockToken)
      .send(mockValidMatch);

      expect(response.body).to.be.deep.equal(mockNewMatch);
      expect(response.status).to.be.equal(201);
    })
  });

  describe('Ao ser chamada sem os valores dos gols', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(mockOneTeam as Team);
      sinon.stub(Match, 'create').resolves(mockNewMatchGoals as Match);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('Coloca os gols como 0 e retorna os dados da partida adicionada com status 201', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', mockToken)
        .send(mockValidMatchNoGoals);

      expect(response.body).to.be.deep.equal(mockNewMatchGoals);
      expect(response.status).to.be.equal(201);
    })
  });

  describe('Ao ser chamada com HomeTeam = AwayTeam', () => {
    it('Retorna mensagem de erro com status 401', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', mockToken)
        .send(mockInvalidMatch);

      const message = 'It is not possible to create a match with two equal teams';

      expect(response.body).to.be.deep.equal({ message });
      expect(response.status).to.be.equal(401);
    })
  });

  describe('Ao ser chamada com um token invalido', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(mockOneTeam as Team);
      sinon.stub(Match, 'create').resolves(mockNewMatch as Match);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('Retorna "Token must be a valid token" com status 401', async () => {
      const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'mockToken')
      .send(mockValidMatch);

      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token'});
      expect(response.status).to.be.equal(401);
    })
  });

  describe('Quando ocorre um erro interno', () => {
    before(() => {
      sinon.stub(Match, 'create').rejects();
    })

    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });

    it('Retorna "Something went wrong" com status 500', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', mockToken)
        .send(mockValidMatchNoGoals);

      expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
      expect(response.status).to.be.equal(500);
    });
  });
});

describe('A rota PATCH /matches/:id/finish', () => {
  describe('Ao ser chamada com um id válido', () => {
    before(() => {
      sinon.stub(Match, 'findByPk').resolves(mockNewMatch as Match);
      sinon.stub(Match, 'update').resolves();
    })

    after(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Retorna "Finished" com status 200', async () => {
      const response = await chai.request(app).patch('/matches/1/finish');

      expect(response.body).to.be.deep.equal({ message: 'Finished' });
      expect(response.status).to.be.equal(200);
    })
  });

  describe('Ao ser chamada com um id inválido', () => {
    before(() => {
      sinon.stub(Match, 'findByPk').resolves(null as unknown as Match);
    })

    after(() => {
      (Match.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna "Match not found" com status 404', async () => {
      const response = await chai.request(app).patch('/matches/999/finish');

      expect(response.body).to.be.deep.equal({ message: 'Match not found' });
      expect(response.status).to.be.equal(404);
    })
  });
});

describe('A rota PATCH /matches/:id', () => {
  describe('Ao ser chamada com um id e dados válidos', () => {
    before(() => {
      sinon.stub(Match, 'findByPk').resolves(mockNewMatch as Match);
      sinon.stub(Match, 'update').resolves();
    })

    after(() => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Retorna "Updated" com status 200', async () => {
      const response = await chai.request(app).patch('/matches/1')
        .send(mockUpdateMatch);

      expect(response.body).to.be.deep.equal({ message: 'Updated' });
      expect(response.status).to.be.equal(200);
    })
  });

  describe('Ao ser chamada com um id inválido', () => {
    before(() => {
      sinon.stub(Match, 'findByPk').resolves(null as unknown as Match);
    })

    after(() => {
      (Match.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna "Match not found" com status 404', async () => {
      const response = await chai.request(app).patch('/matches/999')
        .send(mockUpdateMatch);

      expect(response.body).to.be.deep.equal({ message: 'Match not found' });
      expect(response.status).to.be.equal(404);
    })
  });
});