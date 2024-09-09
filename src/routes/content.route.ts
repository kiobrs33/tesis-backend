import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import {
  validateCreateContent,
  validateIdContent,
  validateUpdateContent,
} from '../validators/content.validator';

const router = Router();
const contentController = new ContentController();

router.get('/', contentController.getContents);
router.get('/:id', [...validateIdContent], contentController.getOneContent);
router.post('/', [...validateCreateContent], contentController.createContent);
router.put('/:id', [...validateUpdateContent], contentController.updateContent);
router.delete('/:id', [...validateIdContent], contentController.deleteContent);

export const ContentRouter = router;
