import { NextFunction, Request, Response } from 'express';
import { createJWT, ReqData, TokenData } from '../auth';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;

  constructor(service = new UserService()) {
    this._service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      await this._service.login({ email, password });

      const token = createJWT({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public role = async (req: ReqData, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data } = req;
      const { email } = data as TokenData;

      const role = await this._service.role(email);

      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
