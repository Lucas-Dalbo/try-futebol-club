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

interface IMatchTeams extends IMatch {
  teamHome?: { teamName: string } | [{ teamName: string }],
  teamAway?: { teamName: string } | [{ teamName: string }],
}

export { IUser, LoginUser, ITeam, IMatch, IMatchTeams };
