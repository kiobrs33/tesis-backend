import { check } from 'express-validator';
import { expressValidateResults } from './express.validator';

export const validateCreateCategory = [
  check('name', 'El name es requerido.').not().isEmpty(),
  expressValidateResults,
];

export const validateIdCategory = [
  check('id', 'El id es numerico').isNumeric(),
  expressValidateResults,
];

export const validateUpdateCategory = [
  check('id', 'El id es numerico').isNumeric(),
  check('name', 'El name es inválido').if(check('name').exists()).isString(),
  expressValidateResults,
];
