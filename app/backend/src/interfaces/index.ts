interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface step {
  step: 'step'
}

export { IUser, step };
