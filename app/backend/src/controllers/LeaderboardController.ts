import { Request, Response, NextFunction } from 'express';
import LeaderbordService from '../services/LeaderbordService';

class LeaderboardController {
  constructor(private _model: LeaderbordService = new LeaderbordService()) { }
  public generalBoard = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const leaderboard = await this._model.getLeaderboard('both');
      res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  public homeBoard = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const leaderboard = await this._model.getLeaderboard('home');
      res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  public awayBoard = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const leaderboard = await this._model.getLeaderboard('away');
      res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
