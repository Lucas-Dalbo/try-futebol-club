import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

class TeamService {
  private _model = Team;

  public findAll = async (): Promise<ITeam[]> => {
    const result = await this._model.findAll();

    return result;
  };
}

export default TeamService;
