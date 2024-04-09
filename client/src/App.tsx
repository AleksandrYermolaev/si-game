import { useEffect, useState } from 'react';
import { RouterProvider, DataProvider } from './providers';
import { socket } from './webSocket';
import { presenterApi, playerApi } from './api';
import { Player } from './types';

export const App = () => {
  const [connectedPlayers, setConnectedPlayers] = useState<Player[]>([]);
  const [wrongPlayers, setWrongPlayers] = useState<Player[]>([]);
  const [newPlayerError, setNewPlayerError] = useState<string>('');
  const [respondent, setRespondent] = useState<Player | null>(null);
  const [presenter, setPresenter] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener(
      'touchmove',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (event: any) {
        console.log(event);
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    const updatePlayers = (players: Player[]) => {
      setConnectedPlayers(players);
    };

    const setAddPlayerError = ({ message }: { error: boolean; message: string }) => {
      console.error(message);
      setNewPlayerError(message || '');
    };

    const addRespondent = (player: Player | null) => {
      setRespondent(player);
    };

    const addPresenter = () => {
      setPresenter(true);
    };

    const updateWrongPlayers = (players: Player[]) => {
      setWrongPlayers(players);
    };

    const endGame = () => {
      setConnectedPlayers([]);
      setNewPlayerError('');
      setRespondent(null);
      setPresenter(false);
    };

    socket.on('update-players', updatePlayers);
    socket.on('add-player-error', setAddPlayerError);
    socket.on('set-respondent', addRespondent);
    socket.on('kick-players', endGame);
    socket.on('set-presenter', addPresenter);
    socket.on('update-wrong-players', updateWrongPlayers);

    return () => {
      socket.off('update-players', updatePlayers);
      socket.off('add-player-error', setAddPlayerError);
      socket.off('set-respondent', addRespondent);
      socket.off('kick-players', endGame);
      socket.off('set-presenter', addPresenter);
      socket.off('update-wrong-players', updateWrongPlayers);
    };
  }, []);

  useEffect(() => {
    presenterApi.get().then((data) => setPresenter(data));
    playerApi.get().then((data) => setConnectedPlayers(data));
    playerApi.getWrongs().then((data) => setWrongPlayers(data));
    playerApi.getRespondent().then((data) => setRespondent(data));
  }, []);

  return (
    <DataProvider
      context={{
        connectedPlayers,
        newPlayerError,
        respondent,
        presenter,
        wrongPlayers,
      }}
    >
      <RouterProvider />
    </DataProvider>
  );
};
