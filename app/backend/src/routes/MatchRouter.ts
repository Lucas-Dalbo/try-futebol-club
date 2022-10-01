import * as express from 'express';
import MatchMiddleware from '../middlewares/MatchMiddleware';
import MatchController from '../controllers/MatchController';
import { ReqData, validateJWT } from '../auth';

class MatchRoute {
  constructor(
    private _controller: MatchController = new MatchController(),
    private _middleware: MatchMiddleware = new MatchMiddleware(),
    public route: express.Router = express.Router(),
  ) {
    this.route.get('/', (req, res, next) => this._controller.findAll(req, res, next));

    this.route.post(
      '/',
      (req: ReqData, res, next) => validateJWT(req, res, next),
      (req, res, next) => this._middleware.matchValidation(req, res, next),
      (req, res, next) => this._controller.create(req, res, next),
    );

    this.route
      .patch('/:id', (req, res, next) => this._controller.update(req, res, next));

    this.route
      .patch('/:id/finish', (req, res, next) => this._controller.finish(req, res, next));
  }
}

const route = new MatchRoute();

export default route;
