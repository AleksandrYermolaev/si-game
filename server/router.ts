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

export default router;
