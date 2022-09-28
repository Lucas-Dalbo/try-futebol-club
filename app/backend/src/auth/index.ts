import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

interface Token {
  data: TokenData,
  iat: number,
  exp: number
}

export interface TokenData {
  email: string,
  password: string
}

export interface ReqData extends Request {
  data?: TokenData,
}

class ClassJWT {
  public create = (user: TokenData): string => {
    const token = jwt.sign({ data: user }, SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    return token;
  };

  public validate = (req: ReqData, res: Response, next: NextFunction): TokenData | void => {
    try {
      const token: string | undefined = req.headers.authorization;
      if (!token) res.status(401).json({ message: 'Token not found' });

      const decoded = jwt.verify(token as string, SECRET) as Token;

      req.data = decoded.data;

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

const tokenJWT = new ClassJWT();

export default tokenJWT;
