interface LoginUser {
  email: string;
  password: string;
}

interface IUser extends LoginUser {
  id: number;
  username: string;
  role: string;
}

export { IUser, LoginUser };
