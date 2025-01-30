import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware para obtener una lista de los campos validados
export const validationFieldsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  // Lista de campos validados con sus resultados
  const validatedFields: { field: string; valid: boolean }[] = [];

  // Si hay errores de validación, recorrer los errores y construir la lista
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      console.log('error', error);
      validatedFields.push({
        field: error.type, // Nombre del campo validado
        valid: false, // Si hay un error, el campo no es válido
      });
    });
  } else {
    // Si no hay errores, todos los campos validados son válidos
    Object.keys(req.body).forEach((field) => {
      validatedFields.push({
        field, // Nombre del campo validado
        valid: true, // El campo es válido si no hay errores
      });
    });
  }

  console.log('validatedFields', validatedFields);

  // Agregar la lista de campos validados al objeto de respuesta
  // res.locals.validatedFields = validatedFields;

  next(); // Continuar con la ejecución del siguiente middleware o ruta
};
