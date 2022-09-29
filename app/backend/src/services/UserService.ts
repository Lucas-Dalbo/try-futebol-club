import * as bcrypt from 'bcryptjs';
import { IUser, LoginUser } from '../interfaces';
import CustomError from '../errors/CustomError';
import UserModel from '../database/models/UserModel';

class UserService {
  private _model = UserModel;

  // constructor(model?: Model) {
  //   this._model = model || UserModel;
  // }

  private findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await this._model.findOne({
      where: { email },
    });

    return user;
  };

  private emailValidation = async (email: string): Promise<IUser> => {
    const user = await this.findByEmail(email);

    if (!user) throw new CustomError('Incorrect email or password', 401);

    return user;
  };

  public login = async (data: LoginUser): Promise<void> => {
    const { email, password } = data;

    const user = await this.emailValidation(email);

    const passVerify = bcrypt.compareSync(password, user.password);

    if (!passVerify) throw new CustomError('Incorrect email or password', 401);
  };

  public role = async (email: string): Promise<{ role: string }> => {
    const user = await this.findByEmail(email);
    const role = user?.role as string;

    return { role };
  };
}

export default UserService;
