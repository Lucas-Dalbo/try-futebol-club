import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  constructor(private _service = new UserService()) {
  }

  public async login(req: Request, res: Response) :Promise<void> {
    const { email, password } = req.body;
    const user = this._service.login(email, password);
    res.status(200).json(user);
  }
}

export default UserController;
