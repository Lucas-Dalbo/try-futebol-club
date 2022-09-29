import * as express from 'express';
import MatchController from '../controllers/MatchController';

class MatchRoute {
  public route: express.Router;
  private _controller: MatchController;

  constructor(controller = new MatchController()) {
    this.route = express.Router();
    this._controller = controller;

    this.route.get(
      '/',
      (req, res, next) => this._controller.findAll(req, res, next),
    );
  }
}

const route = new MatchRoute();

export default route;
