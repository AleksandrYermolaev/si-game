import { Request, Response } from 'express';
import { gameData } from './data';

class Controller {
  public checkPresenter(req: Request, res: Response) {
    return res.json({ presenter: gameData.presenter });
  }

  public setPresenter(_: Request, res: Response) {
    if (gameData.presenter) {
      return res.status(400).send('ведущий уже назначен');
    }
    gameData.presenter = true;
    return res.sendStatus(201);
  }

  public removePresenter(req: Request, res: Response) {
    gameData.presenter = false;
    return res.sendStatus(204);
  }

  public checkPlayers(req: Request, res: Response) {
    return res.json(gameData.players);
  }

  public setPlayer(req: Request<never, unknown, { name: string }>, res: Response) {
    const { name } = req.body;
    if (gameData.players.some((player) => player.name === name)) {
      return res.status(400).json({ error: 'игрок с таким именем уже существует' });
    }
    gameData.players.push({ name });
    return res.status(201).json({ name });
  }

  public removePlayer(req: Request<never, unknown, { name: string }>, res: Response) {
    const { name } = req.body;
    const playerIndex = gameData.players.findIndex((player) => player.name === name);
    if (playerIndex !== -1) {
      gameData.players.splice(playerIndex, 1);
    }
    return res.sendStatus(204);
  }
}

export const controller = new Controller();
