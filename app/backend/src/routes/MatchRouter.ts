import * as express from 'express';
import MatchMiddleware from '../middlewares/MatchMiddleware';
import MatchController from '../controllers/MatchController';

class MatchRoute {
  public route: express.Router;
  private _controller: MatchController;
  private _middleware: MatchMiddleware;

  constructor(controller = new MatchController(), middleware = new MatchMiddleware()) {
    this.route = express.Router();
    this._controller = controller;
    this._middleware = middleware;

    this.route.get(
      '/',
      (req, res, next) => this._controller.findAll(req, res, next),
    );

    this.route.post(
      '/',
      (req, res, next) => this._middleware.matchValidation(req, res, next),
      (req, res, next) => this._controller.create(req, res, next),
    );

    this.route.patch(
      '/:id/finish',
      (req, res, next) => this._controller.finish(req, res, next),
    );
  }
}

const route = new MatchRoute();

export default route;
