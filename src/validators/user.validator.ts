import { check } from 'express-validator';
import { TypeUser } from '@prisma/client';
import { UserService } from '../services/user.service';
import { expressValidateResults } from './express.validator';

const userService = new UserService();

export const validateCreateUser = [
  check('firstname', 'El firstname es requerido').not().isEmpty(),
  check('lastname', 'El lastname es requerido').not().isEmpty(),
  check('age', 'El age es requerido').isNumeric(),
  check('email', 'El email es requerido').exists(),
  check('email', 'El email es inválido').if(check('email').exists()).isEmail(),
  check('email')
    .if(check('email').exists())
    .custom(async (email) => {
      const user = await userService.verifyEmailUser(email);
      if (user) {
        throw new Error('El email ya existe');
      }
      return true;
    }),
  check('password', 'El password es requerido').not().isEmpty(),
  check('password', 'El password debe tener mínimo 6 caracteres')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  check('type', 'El type es requerido').not().isEmpty(),
  check('type')
    .if(check('type').exists())
    .custom((type) => {
      if (!Object.values(TypeUser).includes(type)) {
        throw new Error(
          `El type no es válido, escoge: ${Object.values(TypeUser)}`
        );
      }
      return true;
    }),
  expressValidateResults,
];

export const validateIdUser = [
  check('id', 'El id debe ser numerico').isNumeric(),
  expressValidateResults,
];

export const validatePaginationUsers = [
  check('page', 'Debe ser un número').if(check('page').exists()).isNumeric(),
  check('page')
    .if(check('page').exists())
    .custom(async (value) => {
      if (!(value >= 1)) {
        throw new Error('Debe ser mayor o igual a 1');
      }
      return true;
    }),
  check('take', 'Deber ser un numero').if(check('page').exists()).isNumeric(),
  check('take')
    .if(check('page').exists())
    .custom(async (value) => {
      if (!(value >= 1)) {
        throw new Error('Debe ser mayor o igual a 1');
      }
      return true;
    }),
  expressValidateResults,
];

export const validateUpdateUser = [
  check('firstname', 'El firstname es inválido')
    .if(check('firstname').exists())
    .isString(),
  check('lastname', 'El lastname es inválido')
    .if(check('lastname').exists())
    .isString(),
  check('email', 'El email es inválido').if(check('email').exists()).isEmail(),
  check('email')
    .if(check('email').exists())
    .custom(async (value) => {
      const user = await userService.verifyEmailUser(value);
      if (user) {
        throw new Error('El email ya existe');
      }
      return true;
    }),
  check('password', 'El password es requerido')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  check('type')
    .if(check('type').exists())
    .custom((type) => {
      if (!Object.values(TypeUser).includes(type)) {
        throw new Error(
          `El type no es válido, escoge: ${Object.values(TypeUser)}`
        );
      }
      return true;
    }),
  expressValidateResults,
];
