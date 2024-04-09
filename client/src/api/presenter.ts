import axios from 'axios';
import { ENDPOINTS } from './endpoints';

const getPresenter = async () => {
  const { data } = await axios.get<{ presenter: boolean }>(ENDPOINTS.presenter);
  return data.presenter;
};

const setPresenter = async () => {
  return axios.post(ENDPOINTS.presenter);
};

const removePresenter = async () => {
  axios.delete(ENDPOINTS.presenter);
};

export const presenterApi = {
  get: getPresenter,
  set: setPresenter,
  remove: removePresenter,
};
