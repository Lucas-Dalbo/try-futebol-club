import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';
import CustomError from '../errors/CustomError';

class TeamService {
  private _model = Team;

  public findAll = async (): Promise<ITeam[]> => {
    const result = await this._model.findAll();

    return result;
  };

  public findByPk = async (id: string): Promise<ITeam> => {
    const result = await this._model.findByPk(id);

    if (!result) throw new CustomError('Team not found', 404);

    return result;
  };
}

export default TeamService;
