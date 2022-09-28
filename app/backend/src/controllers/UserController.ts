import { NextFunction, Request, Response } from 'express';
import tokenJWT, { TokenData } from '../auth';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;

  constructor(service = new UserService()) {
    this._service = service;
  }

  static createToken(data: TokenData) {
    return tokenJWT.create(data);
  }

  public async login(req: Request, res: Response, next: NextFunction) :Promise<void> {
    try {
      const { email, password } = req.body;
      await this._service.login(email, password);

      const token = UserController.createToken({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
