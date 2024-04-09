import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { gameData } from './data';
import { Player, WebSocket, WebSocketServer } from './types';

class Controller {
  public checkPresenter(req: Request, res: Response) {
    return res.status(201).json({ presenter: gameData.presenter });
  }

  public setPresenter(req: Request, res: Response) {
    if (gameData.presenter) {
      return res.status(400).send('ведущий уже назначен');
    }
    gameData.presenter = true;
    const webSocket: WebSocketServer = req.app.get('webSocket');
    webSocket.emit('set-presenter');
    return res.sendStatus(201);
  }

  public removePresenter(req: Request, res: Response) {
    gameData.presenter = false;
    gameData.players = [];
    gameData.responder = null;
    gameData.wrongPlayers = [];
    const webSocket: WebSocketServer = req.app.get('webSocket');
    webSocket.emit('kick-players');
    return res.sendStatus(204);
  }

  public checkPlayers(req: Request, res: Response) {
    console.log(gameData);
    return res.json(gameData.players);
  }

  public getRespondent(req: Request, res: Response) {
    return res.json(gameData.responder);
  }

  public setPlayer(req: Request<never, unknown, { name: string }>, res: Response) {
    const { name } = req.body;
    if (gameData.players.some((player) => player.name === name)) {
      return res.status(400).json({ error: 'игрок с таким именем уже существует' });
    }
    gameData.players.push({ name });
    return res.status(201).json({ name });
  }

  public getWrongPlayers(req: Request, res: Response) {
    return res.status(200).json(gameData.wrongPlayers);
  }

  public setWrongPlayer(req: Request<never, unknown, { name: string }>, res: Response) {
    gameData.wrongPlayers.push(req.body);
    gameData.responder = null;
    const webSocket: WebSocketServer = req.app.get('webSocket');
    webSocket.emit('update-wrong-players', gameData.wrongPlayers);
    webSocket.emit('set-respondent', null);
    return res.sendStatus(204);
  }

  public clearWrongPlayers(req: Request, res: Response) {
    gameData.wrongPlayers = [];
    gameData.responder = null;
    const webSocket: WebSocketServer = req.app.get('webSocket');
    webSocket.emit('update-wrong-players', []);
    webSocket.emit('set-respondent', null);
    return res.sendStatus(204);
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

const registerSocketHandlers = (socket: WebSocket, server: WebSocketServer) => {
  const setPlayer = (payload: Player) => {
    const { name } = payload;
    if (gameData.players.some((player) => player.name === name)) {
      server.emit('add-player-error', {
        error: true,
        message: 'Игрок с таким именем уже существует',
      });
      return;
    }
    gameData.players.push({ name });
    server.emit('update-players', gameData.players);
  };

  const removePlayer = (payload: Player) => {
    const { name } = payload;
    const playerIndex = gameData.players.findIndex((player) => player.name === name);
    if (playerIndex !== -1) {
      gameData.players.splice(playerIndex, 1);
      server.emit('update-players', gameData.players);
    }
  };

  const setRespondent = (payload: Player) => {
    if (gameData.responder) {
      return;
    }
    gameData.responder = payload;
    server.emit('set-respondent', payload);
  };

  socket.on('add-player', setPlayer);
  socket.on('remove-player', removePlayer);
  socket.on('answer', setRespondent);
};

export const controller = new Controller();

export const onConnection = (server: WebSocketServer) => (socket: Socket) => {
  registerSocketHandlers(socket, server);
};
