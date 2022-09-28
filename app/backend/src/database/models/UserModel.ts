import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model { }

UserModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default UserModel;
