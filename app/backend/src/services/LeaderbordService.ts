import { Op } from 'sequelize';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IBoard, IMatchFull, ITeam } from '../interfaces';

type BoardType = 'home' | 'away' | 'both';

class LeaderbordService {
  constructor(
    private _teams = Team,
    private _matches = Match,
  ) {}

  private buildData = (name: string): IBoard => ({
    name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '0',
  });

  private findMatches = {
    home: async (id: number): Promise<IMatchFull[]> => this._matches
      .findAll({ where: { [Op.and]: [{ inProgress: false }, { homeTeam: id }] } }),

    away: async (id: number): Promise<IMatchFull[]> => this._matches
      .findAll({ where: { [Op.and]: [{ inProgress: false }, { awayTeam: id }] } }),

    both: async (id: number): Promise<IMatchFull[]> => this._matches
      .findAll({ where: {
        [Op.and]: [
          { inProgress: false },
          { [Op.or]: [{ homeTeam: id }, { awayTeam: id }] },
        ],
      } }),
  };

  private homeAndRival = {
    home: (match: IMatchFull, _id: number): number[] => [match.homeTeamGoals, match.awayTeamGoals],
    away: (match: IMatchFull, _id: number): number[] => [match.awayTeamGoals, match.homeTeamGoals],
    both: (match: IMatchFull, id: number): number[] => {
      if (match.homeTeam === id) return [match.homeTeamGoals, match.awayTeamGoals];
      return [match.awayTeamGoals, match.homeTeamGoals];
    },
  };

  private vdlCalculation = (homeGoals: number, awayGoals: number): number[] => {
    if (homeGoals > awayGoals) return [1, 0, 0];
    if (homeGoals === awayGoals) return [0, 1, 0];
    return [0, 0, 1];
  };

  private buildTeamData = (
    matches: IMatchFull[],
    team: ITeam,
    board: BoardType,
  ): IBoard => {
    const result = matches.reduce((acc, crr) => {
      const [mainTeamGoals, rivalTeamGoals] = this.homeAndRival[board](crr, team.id);
      const [vic, draw, loss] = this.vdlCalculation(mainTeamGoals, rivalTeamGoals);

      return {
        ...acc,
        goalsFavor: acc.goalsFavor + mainTeamGoals,
        goalsOwn: acc.goalsOwn + rivalTeamGoals,
        totalVictories: acc.totalVictories + vic,
        totalLosses: acc.totalLosses + loss,
        totalDraws: acc.totalDraws + draw,
        totalGames: acc.totalGames + 1,
      };
    }, this.buildData(team.teamName));

    return result;
  };

  private buildBoard = async (board: BoardType): Promise<IBoard[]> => {
    const teams = await this._teams.findAll();

    const firstBoard = await Promise.all(teams.map(async (team) => {
      const games = await this.findMatches[board](team.id);

      const teamData = this.buildTeamData(games, team, board);

      return teamData;
    }));

    return firstBoard;
  };

  private calculateBoard = (firstBoard: IBoard[]): IBoard[] => {
    const secondBoard = firstBoard.map((team) => {
      const totalPoints = (team.totalVictories * 3) + team.totalDraws;
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const efficiency = ((totalPoints / (team.totalGames * 3)) * 100).toFixed(2);

      return {
        ...team,
        totalPoints,
        goalsBalance,
        efficiency,
      };
    });

    return secondBoard;
  };

  private sortBoard = (secondBoard: IBoard[]): IBoard[] => {
    const finalBoard = secondBoard.sort((a, b) => {
      switch (true) {
        case a.totalPoints !== b.totalPoints:
          return b.totalPoints - a.totalPoints;

        case a.goalsBalance !== b.goalsBalance:
          return b.goalsBalance - a.goalsBalance;

        case a.goalsFavor !== b.goalsBalance:
          return b.goalsFavor - a.goalsFavor;

        default:
          return a.goalsOwn - b.goalsOwn;
      }
    });

    return finalBoard;
  };

  public getLeaderboard = async (board: BoardType): Promise<IBoard[]> => {
    const firstBoard = await this.buildBoard(board);
    const secondBoard = this.calculateBoard(firstBoard);
    const finalBoard = this.sortBoard(secondBoard);

    return finalBoard;
  };
}

export default LeaderbordService;
