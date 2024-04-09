const serverUrl = `http://${import.meta.env.VITE_IPV4}:${import.meta.env.VITE_SERVER_PORT}`;

export const ENDPOINTS = {
  presenter: `${serverUrl}/presenter`,
  player: `${serverUrl}/player`,
  playerWrong: `${serverUrl}/player-wrong`,
  respondent: `${serverUrl}/respondent`,
};
