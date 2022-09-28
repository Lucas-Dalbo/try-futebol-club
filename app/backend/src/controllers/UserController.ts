import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;

  constructor(service = new UserService()) {
    this._service = service;
  }

  public async login(req: Request, res: Response, next: NextFunction) :Promise<void> {
    try {
      const { email, password } = req.body;
      await this._service.login(email, password);
      res.status(200).json({ token: 'abcdefg' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
