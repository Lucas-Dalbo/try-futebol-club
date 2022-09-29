import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';
import { LoginUser } from '../interfaces';

class UserMiddleware {
  public name = 'user';

  private fieldsValidation = (data: LoginUser): boolean => {
    if (!data.email || !data.password) return false;
    return true;
  };

  public loginValidation = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const validate = this.fieldsValidation({ email, password });

    if (!validate) throw new CustomError('All fields must be filled', 400);

    next();
  };
}

export default UserMiddleware;
