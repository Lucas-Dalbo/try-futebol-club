import * as express from 'express';
import UserController from '../controllers/UserController';

class UserRoute {
  public route: express.Router;
  private _controller: UserController;

  constructor(controller = new UserController()) {
    this.route = express.Router();
    this._controller = controller;

    this.route.post('/', (req, res, next) => this._controller.login(req, res, next));
  }
}

const route = new UserRoute();

export default route;
