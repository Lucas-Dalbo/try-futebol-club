import UserModel from '../database/models/UserModel';

class UserService {
  private _model: UserModel;

  constructor(model = new UserModel()) {
    this._model = model;
  }
}

export default UserService;
