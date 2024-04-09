import { Router } from 'express';
import { ENDPOINTS } from './config';
import { controller } from './controller';

const router = Router();

router.get(ENDPOINTS.presenter, controller.checkPresenter);
router.post(ENDPOINTS.presenter, controller.setPresenter);
router.delete(ENDPOINTS.presenter, controller.removePresenter);

router.get(ENDPOINTS.player, controller.checkPlayers);
router.post(ENDPOINTS.player, controller.setPlayer);
router.delete(ENDPOINTS.player, controller.removePlayer);

router.get(ENDPOINTS.playerWrong, controller.getWrongPlayers);
router.post(ENDPOINTS.playerWrong, controller.setWrongPlayer);
router.delete(ENDPOINTS.playerWrong, controller.clearWrongPlayers);

router.get(ENDPOINTS.respondent, controller.getRespondent);

export default router;
