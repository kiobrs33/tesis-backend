import { NextFunction, request, response } from 'express';
import { validationResult } from 'express-validator';

export const expressValidateResults = (
  req = request,
  res = response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Error en la validacion de campos',
      errors,
    });
  }

  // Sirve para continuar con el siguiente MIDDLEWARE
  next();
};
