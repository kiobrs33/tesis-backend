import { check } from 'express-validator';
import { expressValidateResults } from './express.validator';

export const validateCreatePromotion = [
  check('name', 'El name es requerido.').not().isEmpty(),
  check('discount', 'El discount es requerido.').isNumeric(),
  check('star_date', 'El star_date es requerido.').isDate(),
  check('final_date', 'El final_date es requerido.').isDate(),
  expressValidateResults,
];

export const validateIdPromotion = [
  check('id', 'El id es numerico').isNumeric(),
  expressValidateResults,
];

export const validateUpdatePromotion = [
  check('id', 'El id es numerico').isNumeric(),
  check('name', 'El name es inválido').if(check('name').exists()).isString(),
  check('discount', 'El discount es inválido')
    .if(check('discount').exists())
    .isNumeric(),
  check('star_date', 'El star_date es inválido')
    .if(check('star_date').exists())
    .isDate(),
  check('final_date', 'El final_date es inválido')
    .if(check('final_date').exists())
    .isDate(),
  expressValidateResults,
];
