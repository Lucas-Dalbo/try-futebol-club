import { Op } from 'sequelize';
import { IUser } from '../interfaces';
import UserModel from '../database/models/UserModel';

class UserService {
  private _model = UserModel;

  // constructor(model?: Model) {
  //   this._model = model || UserModel;
  // }

  public async login(email: string, password: string): Promise<IUser | null> {
    const user = this._model.findOne({
      where: { [Op.and]: [{ email }, { password }] },
    });

    if (!user) throw new Error('deu ruim');

    return user;
  }
}

export default UserService;
