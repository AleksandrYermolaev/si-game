interface GameData {
  presenter: boolean;
  players: Player[];
}

interface Player {
  name: string;
}

export const gameData: GameData = {
  presenter: false,
  players: [],
};
