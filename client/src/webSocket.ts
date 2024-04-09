import { Socket, io } from 'socket.io-client';
import { Player } from './types';

const serverUrl = `http://${import.meta.env.VITE_IPV4}:${import.meta.env.VITE_SERVER_PORT}`;

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

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverUrl);
