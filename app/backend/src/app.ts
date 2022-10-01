import * as express from 'express';
import UserRoute from './routes/UserRoute';
import TeamRoute from './routes/TeamRoute';
import MatchRoute from './routes/MatchRouter';
import LeaderboardRoute from './routes/LeaderboardRoute';
import errorMiddleware from './errors/errorMidleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.setRoutes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private setRoutes(): void {
    this.app.use('/login', UserRoute.route);
    this.app.use('/teams', TeamRoute.route);
    this.app.use('/matches', MatchRoute.route);
    this.app.use('/leaderboard', LeaderboardRoute.route);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
