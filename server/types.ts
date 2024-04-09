import { Server, Socket } from 'socket.io';

export interface GameData {
  presenter: boolean;
  players: Player[];
  wrongPlayers: Player[];
  responder: Player | null;
}

export interface Player {
  name: string;
}

export interface ServerToClientEvents {
  'update-players': (players: Player[]) => void;
  'add-player-error': ({ error, message }: { error: boolean; message: string }) => void;
  'kick-players': () => void;
  'set-respondent': (player: Player | null) => void;
  'set-presenter': () => void;
  'update-wrong-players': (players: Player[]) => void;
}

export interface ClientToServerEvents {
  'add-player': (payload: Player) => void;
  'remove-player': (payload: Player) => void;
  answer: (payload: Player) => void;
}

export type WebSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type WebSocketServer = Server<ClientToServerEvents, ServerToClientEvents>;
