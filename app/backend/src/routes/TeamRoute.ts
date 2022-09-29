import * as express from 'express';
import TeamController from '../controllers/TeamController';

class TeamRoute {
  public route: express.Router;
  private _controller: TeamController;

  constructor(controller = new TeamController()) {
    this.route = express.Router();
    this._controller = controller;

    this.route.get(
      '/',
      (req, res, next) => this._controller.findAll(req, res, next),
    );
  }
}

const route = new TeamRoute();

export default route;
