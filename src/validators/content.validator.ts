import { check } from 'express-validator';
import { expressValidateResults } from './express.validator';

export const validateCreateContent = [
  check('name', 'El name es requerido.').not().isEmpty(),
  check('author', 'El author es requerido.').not().isEmpty(),
  check('description', 'La description es requerida.').not().isEmpty(),
  check('price', 'El name es requerido.').isNumeric(),
  check('categories_id', 'El categories_id es inválido')
    .if(check('categories_id').exists())
    .isArray({ min: 1 }),
  expressValidateResults,
];

export const validateIdContent = [
  check('id', 'El id es numerico').isNumeric(),
  expressValidateResults,
];

export const validateUpdateContent = [
  check('id', 'El id es numerico').isNumeric(),
  check('name', 'El firstname es inválido')
    .if(check('name').exists())
    .isString(),
  check('author', 'El author es inválido')
    .if(check('author').exists())
    .isString(),
  check('description', 'El description es inválido')
    .if(check('description').exists())
    .isString(),
  check('description', 'El description es inválido')
    .if(check('description').exists())
    .isNumeric(),
  expressValidateResults,
];
