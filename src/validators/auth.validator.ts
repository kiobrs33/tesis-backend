import { check } from 'express-validator';
import { TypeUser } from '@prisma/client';
import { expressValidateResults } from './express.validator';
import { UserService } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { checkWhitelist } from '../middlewares/checkWhitelist.handler';
import { validationFieldsHandler } from '../middlewares/validationFieldsHandler';

const userService = new UserService();

export const validateLogin = [
  check('email', 'El correo electrónico es inválido.').isEmail(),
  check('password', 'La contraseña es requerida.').not().isEmpty(),
  check('password', 'La contraseña debe tener mínimo 6 caracteres')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  expressValidateResults,
];

export const validateRegister = [
  check('firstname', 'Los nombres son requeridos.').not().isEmpty(),
  check('lastname', 'Los apellidos son requeridos.').not().isEmpty(),
  check('age', 'La edad es requerida.').isInt({ min: 1, max: 120 }).toInt(),
  check('email', 'El correo electrónico es requerido.').not().isEmpty(),
  check('email', 'El correo electrónico es inválido')
    .if(check('email').exists())
    .isEmail(),
  check('email')
    .if(check('email').exists())
    .custom(async (email) => {
      const user = await userService.verifyEmailUser(email);
      if (user) {
        throw new Error('El correo electrónico ya existe.');
      }
      return true;
    }),
  check('password', 'La contraseña es requerida.').not().isEmpty(),
  check('password', 'La contraseña debe tener mínimo 6 caracteres.')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  check('type', 'El tipo de usuario es requerido.').not().isEmpty(),
  check('type')
    .if(check('type').exists())
    .custom((type) => {
      if (!Object.values(TypeUser).includes(type)) {
        throw new Error(
          `El tipo de usuario no es válido, escoge: ${Object.values(TypeUser)}`
        );
      }
      return true;
    }),
  validationFieldsHandler,
  // Funcion para filtrar la informacion desde el endpoint
  (req: Request, res: Response, next: NextFunction) => {
    req.body = checkWhitelist(req.body, [
      'firstname',
      'lastname',
      'age',
      'email',
      'password',
      'type',
    ]);
    next();
  },
  expressValidateResults,
];
