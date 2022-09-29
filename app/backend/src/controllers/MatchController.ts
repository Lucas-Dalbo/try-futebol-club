import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/Matchservice';

class MatchController {
  private _service: MatchService;

  constructor(service = new MatchService()) {
    this._service = service;
  }

  public findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const matches = await this._service.findAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
