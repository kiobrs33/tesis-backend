import { Router } from 'express';
import { PromotionController } from '../controllers/promotion.controller';
import {
  validateCreatePromotion,
  validateIdPromotion,
  validateUpdatePromotion,
} from '../validators/promotion.validator';

const router = Router();
const promotionController = new PromotionController();

router.get('/', promotionController.getPromotions);
router.get(
  '/:id',
  [...validateIdPromotion],
  promotionController.getOnePromotion
);
router.post(
  '/',
  [...validateCreatePromotion],
  promotionController.createPromotion
);
router.put(
  '/:id',
  [...validateUpdatePromotion],
  promotionController.updatePromotion
);
router.delete(
  '/:id',
  [...validateIdPromotion],
  promotionController.deletePromotion
);

export const PromotionRouter = router;
