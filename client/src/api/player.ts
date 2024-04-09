import axios from 'axios';
import { ENDPOINTS } from './endpoints';
import { Player } from '../types';

const getPlayers = async () => {
  const { data } = await axios.get<Player[]>(ENDPOINTS.player);
  return data;
};

const getWrongPlayers = async () => {
  const { data } = await axios.get<Player[]>(ENDPOINTS.playerWrong);
  return data;
};

const setWrongPlayer = async (player: Player) => {
  axios.post(ENDPOINTS.playerWrong, player);
};

const clearWrongPlayers = async () => {
  axios.delete(ENDPOINTS.playerWrong);
};

const getRespondent = async () => {
  const { data } = await axios.get<Player>(ENDPOINTS.respondent);
  return data;
};

export const playerApi = {
  get: getPlayers,
  setWrong: setWrongPlayer,
  clearWrongs: clearWrongPlayers,
  getWrongs: getWrongPlayers,
  getRespondent,
};
