import { check } from 'express-validator';
import { expressValidateResults } from './express.validator';
import { ContentService } from '../services/content.service';

const contentService = new ContentService();

export const validateCreateRanking = [
  check('position', 'El position es requerido.').isNumeric(),
  check('week', 'El week es requerido.').isNumeric(),
  check('content_id', 'El content_id es requerido.').isNumeric(),
  check('content_id')
    .if(check('content_id').exists())
    .custom(async (value) => {
      const content = await contentService.getOneContent(value);
      console.log(content);
      if (!content) {
        throw new Error('El content_id del content no existe.');
      }
      return true;
    }),
  expressValidateResults,
];

export const validateIdRanking = [
  check('id', 'El id es numerico').isNumeric(),
  expressValidateResults,
];

export const validateUpdateRanking = [
  check('id', 'El id es numerico').isNumeric(),
  check('position', 'El position es inválido')
    .if(check('position').exists())
    .isNumeric(),
  check('week', 'El week es inválido').if(check('week').exists()).isNumeric(),
  check('content_id', 'El content_id es inválido')
    .if(check('content_id').exists())
    .isNumeric(),
  check('content_id')
    .if(check('content_id').exists())
    .custom(async (value) => {
      const content = await contentService.getOneContent(value);
      console.log(content);
      if (!content) {
        throw new Error('El content_id del content no existe.');
      }
      return true;
    }),
  expressValidateResults,
];
