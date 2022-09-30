import * as bcrypt from 'bcryptjs';
import { createJWT } from '../../auth'

export const mockValidUser = {
  email: "ronaldo@fenomeno.com",
  password: bcrypt.hashSync("EuSouRonaldo09"),
};

export const sendValidUser = {
  email: "ronaldo@fenomeno.com",
  password: "EuSouRonaldo09",
};

export const mockInvalidUser = {
  email: "messi@messi.com",
  password: "messiOficial"
};

export const noEmailUser = {
  password: '987654'
};

export const noPasswordUser = {
  email: 'seguranca@zero.com'
};

export const mockToken = createJWT(mockValidUser);

export const roleUser = {
  email: "ronaldo@fenomeno.com",
  password: "EuSouRonaldo09",
  role: "boleiro"
};

export const mockTeams = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
];

export const mockOneTeam = {
  id: 3,
  teamName: "Botafogo"
};

export const mockMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
];

export const mockValidMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 0,
}

export const mockNewMatch = { ...mockValidMatch, id: 1, inProgress: true, };