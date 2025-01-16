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
  // Ruta
  '/',
  // Middlewares
  validateJwt,
  checkRol(['ADMIN']),
  validatePaginationUsers,
  // Función que se ejecutará para esta ruta
  userController.getUsers
);
router.get(
  // Ruta
  '/:id',
  // Middlewares
  validateJwt,
  checkRol(['ADMIN']),
  validateIdUser,
  // Función que se ejecutará para esta ruta
  userController.getOneUser
);
router.post(
  // Ruta
  '/',
  // Middlewares
  validateJwt,
  checkRol(['ADMIN']),
  validateCreateUser,
  // Función que se ejecutará para esta ruta
  userController.createUser
);
router.put(
  // Ruta
  '/:id',
  // Middlewares
  validateJwt,
  checkRol(['ADMIN']),
  validateUpdateUser,
  // Función que se ejecutará para esta ruta
  userController.updateUser
);
router.delete(
  // Ruta
  '/:id',
  // Middlewares
  validateJwt,
  checkRol(['ADMIN']),
  validateIdUser,
  // Función que se ejecutará para esta ruta
  userController.deleteUser
);

export const UserRouter = router;
