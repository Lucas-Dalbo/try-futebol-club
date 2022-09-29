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

export { IUser, LoginUser, ITeam };
