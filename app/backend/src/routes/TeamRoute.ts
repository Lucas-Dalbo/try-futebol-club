import * as express from 'express';
import TeamController from '../controllers/TeamController';

class TeamRoute {
  constructor(
    private _controller: TeamController = new TeamController(),
    public route: express.Router = express.Router(),
  ) {
    this.route
      .get('/', (req, res, next) => this._controller.findAll(req, res, next));

    this.route
      .get('/:id', (req, res, next) => this._controller.findByPk(req, res, next));
  }
}

const route = new TeamRoute();

export default route;
