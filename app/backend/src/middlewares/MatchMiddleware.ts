import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';

class MatchMiddleware {
  private teamsValidation = (home: number, away: number): void => {
    const isSame = home === away;
    const message = 'It is not possible to create a match with two equal teams';
    if (isSame) throw new CustomError(message, 401);
  };

  public matchValidation = (req: Request, _res: Response, next: NextFunction): void => {
    const { homeTeam, awayTeam } = req.body;
    this.teamsValidation(homeTeam, awayTeam);

    next();
  };
}

export default MatchMiddleware;
