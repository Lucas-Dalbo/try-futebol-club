import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';

const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (!err.status) {
    // console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  const { message, status } = err;
  res.status(status).json({ message });
};

export default errorMiddleware;
