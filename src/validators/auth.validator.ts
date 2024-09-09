import { check } from 'express-validator';
import { expressValidateResults } from './express.validator';

export const validateLogin = [
  check('email', 'El email no es valido').isEmail(),
  check('password', 'El passowrd es invalido').not().isEmpty(),
  check('password', 'El password debe tener mínimo 6 caracteres')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  expressValidateResults,
];
