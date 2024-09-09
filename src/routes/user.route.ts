import { Router } from 'express';

import {
  validateCreateUser,
  validateIdUser,
  validatePaginationUsers,
  validateUpdateUser,
} from '../validators/user.validator';
import { UserController } from '../controllers/user.controller';
import { validateJwt } from '../middlewares/session.handler';
import { checkRol } from '../middlewares/rol.handler';

const router = Router();
const userController = new UserController();

router.get(
  '/',
  // [validateJwt, ...validatePaginationUsers, ...validateIdUser],
  validateJwt,
  checkRol(['ADMIN']),
  validatePaginationUsers,
  userController.getUsers
);
router.get('/:id', [...validateIdUser], userController.getOneUser);
router.post('/', [...validateCreateUser], userController.createUser);
router.put('/:id', [...validateUpdateUser], userController.updateUser);
router.delete('/:id', [...validateIdUser], userController.deleteUser);

export const UserRouter = router;
