import * as express from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

class UserRoute {
  public route: express.Router;
  private _controller: UserController;
  private _middlewrae: UserMiddleware;

  constructor(controller = new UserController(), middleware = new UserMiddleware()) {
    this.route = express.Router();
    this._controller = controller;
    this._middlewrae = middleware;

    this.route.post(
      '/',
      (req, res, next) => this._middlewrae.loginValidation(req, res, next),
      (req, res, next) => this._controller.login(req, res, next),
    );
  }
}

const route = new UserRoute();

export default route;
