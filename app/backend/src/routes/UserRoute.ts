import * as express from 'express';
import { ReqData, validateJWT } from '../auth';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

class UserRoute {
  constructor(
    private _controller: UserController = new UserController(),
    private _middleware: UserMiddleware = new UserMiddleware(),
    public route: express.Router = express.Router(),
  ) {
    this.setRequest();
  }

  private setRequest = (): void => {
    this.route.post(
      '/',
      (req, res, next) => this._middleware.loginValidation(req, res, next),
      (req, res, next) => this._controller.login(req, res, next),
    );

    this.route.get(
      '/validate',
      (req: ReqData, res, next) => validateJWT(req, res, next),
      (req, res, next) => this._controller.role(req, res, next),
    );
  };
}

const route = new UserRoute();

export default route;
