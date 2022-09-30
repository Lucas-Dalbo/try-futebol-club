import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService;

  constructor(service = new MatchService()) {
    this._service = service;
  }

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { inProgress } = req.query;

      let matches;

      if (inProgress) {
        const boolProgress = inProgress === 'true';
        matches = await this._service.findAllByProgress(boolProgress);
      } else {
        matches = await this._service.findAll();
      }

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
