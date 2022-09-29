import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces';
import CustomError from '../errors/CustomError';
import UserModel from '../database/models/UserModel';

class UserService {
  private _model = UserModel;

  // constructor(model?: Model) {
  //   this._model = model || UserModel;
  // }

  private async emailValidation(email: string): Promise<IUser> {
    const user = await this._model.findOne({
      where: { email },
    });

    if (!user) throw new CustomError('Incorrect email or password', 401);

    return user as IUser;
  }

  public async login(email: string, password: string): Promise<void> {
    const user = await this.emailValidation(email);

    const passVerify = bcrypt.compareSync(password, user.password);

    if (!passVerify) throw new CustomError('Incorrect email or password', 401);
  }
}

export default UserService;
