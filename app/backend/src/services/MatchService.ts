import Team from '../database/models/TeamModel';
import { IMatch, IMatchTeams } from '../interfaces';
import Match from '../database/models/MatchModel';
import CustomError from '../errors/CustomError';

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

  public create = async (data: IMatch): Promise<IMatch> => {
    const matchData = {
      ...data,
      inProgress: !data.inProgress,
      homeTeamGoals: !data.homeTeamGoals ? 0 : data.homeTeamGoals,
      awayTeamGoals: !data.awayTeamGoals ? 0 : data.awayTeamGoals,
    };

    const result = await this._model.create(matchData);

    return result;
  };

  public finish = async (id: string): Promise<void> => {
    const match = await this._model.findByPk(id);
    if (!match) throw new CustomError('Match not found', 404);

    await this._model.update({ inProgress: false }, { where: { id } });
    // [1] quando altera; [0] quando não altera
  };
}

export default MatchService;
