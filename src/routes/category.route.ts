import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import {
  validateCreateCategory,
  validateIdCategory,
  validateUpdateCategory,
} from '../validators/category.validator';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getCategories);
router.get('/:id', [...validateIdCategory], categoryController.getOneCategorie);
router.post(
  '/',
  [...validateCreateCategory],
  categoryController.createCategory
);
router.put(
  '/:id',
  [...validateUpdateCategory],
  categoryController.updateCategory
);
router.delete(
  '/:id',
  [...validateIdCategory],
  categoryController.deleteCategory
);

export const CategoryRouter = router;
