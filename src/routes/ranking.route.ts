import { Router } from 'express';
import { RankingController } from '../controllers/ranking.controller';
import {
  validateCreateRanking,
  validateIdRanking,
  validateUpdateRanking,
} from '../validators/ranking.validator';

const router = Router();
const rankingController = new RankingController();

router.get('/', rankingController.getRankings);
router.get('/:id', [...validateIdRanking], rankingController.getOneRanking);
router.post('/', [...validateCreateRanking], rankingController.createRanking);
router.put('/:id', [...validateUpdateRanking], rankingController.updateRanking);
router.delete('/:id', [...validateIdRanking], rankingController.deleteRanking);

export const RankingRouter = router;
