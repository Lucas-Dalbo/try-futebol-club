import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UserModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default UserModel;
