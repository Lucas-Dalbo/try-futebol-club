import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private _service: TeamService;

  constructor(service = new TeamService()) {
    this._service = service;
  }

  public findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await this._service.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
