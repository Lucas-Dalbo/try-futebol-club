interface LoginUser {
  email: string;
  password: string;
}

interface IUser extends LoginUser {
  id: number;
  username: string;
  role: string;
}

interface ITeam {
  id: number,
  teamName: string;
}

interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals?: number,
  awayTeam: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
}

interface IMatchFull extends IMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatchTeams extends IMatch {
  teamHome?: { teamName: string } | [{ teamName: string }],
  teamAway?: { teamName: string } | [{ teamName: string }],
}

interface IBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export { IUser, LoginUser, ITeam, IMatch, IMatchTeams, IBoard, IMatchFull };
