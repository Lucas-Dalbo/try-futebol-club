import Team from '../database/models/TeamModel';
import { IMatch, IMatchTeams } from '../interfaces';
import Match from '../database/models/MatchModel';

class MatchService {
  private _model = Match;

  public findAll = async (): Promise<IMatch[]> => {
    const result = await this._model.findAll(
      {
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return result as IMatchTeams[];
  };

  public findAllByProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const result = await this._model.findAll(
      {
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return result as IMatchTeams[];
  };
}

export default MatchService;
