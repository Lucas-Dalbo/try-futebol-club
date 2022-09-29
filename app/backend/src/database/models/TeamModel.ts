import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  teamName: { type: DataTypes.STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Team;
