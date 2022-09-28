import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;

  constructor(service = new UserService()) {
    this._service = service;
  }

  public async login(req: Request, res: Response) :Promise<void> {
    const { email, password } = req.body;
    const user = await this._service.login(email, password);
    res.status(200).json(user);
  }
}

export default UserController;
