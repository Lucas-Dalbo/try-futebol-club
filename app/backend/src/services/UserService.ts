import { Op } from 'sequelize';
import CustomError from '../errors/CustomError';
// import { IUser } from '../interfaces';
import UserModel from '../database/models/UserModel';

class UserService {
  private _model = UserModel;

  // constructor(model?: Model) {
  //   this._model = model || UserModel;
  // }

  public async login(email: string, password: string): Promise<void> {
    const user = await this._model.findOne({
      where: { [Op.and]: [{ email }, { password }] },
    });

    if (!user) throw new CustomError('User not found', 404);
  }
}

export default UserService;
