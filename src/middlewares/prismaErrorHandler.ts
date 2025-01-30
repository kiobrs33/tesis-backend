import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// Middleware de manejo de errores de Prisma
export const prismaErrorHandler = (
  err:
    | Error
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Errores conocidos de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Error conocido de Prisma:', err);
    switch (err.code) {
      case 'P2002':
        res.status(400).json({
          error: 'Violación de restricción única',
          // message: err.message,
          // meta: err.meta,
        });
        return;
      case 'P2003':
        res.status(400).json({
          error: 'Violación de restricción de clave externa',
          // message: err.message,
          // meta: err.meta,
        });
        return;
      case 'P2025':
        res.status(404).json({
          error: 'Registro no encontrado',
          // message: err.message,
          // meta: err.meta,
        });
        return;
      case 'P2004':
        res.status(400).json({
          error: 'Valor no válido en la consulta',
          // message: err.message,
          // meta: err.meta,
        });
        return;
      default:
        res.status(400).json({
          error: 'Error desconocido de Prisma',
          // message: err.message,
          // code: err.code,
        });
        return;
    }
  }

  // Errores desconocidos de Prisma
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error('Error desconocido de Prisma:', err);
    res.status(500).json({
      error: 'Error desconocido de Prisma',
      // message: err.message,
    });
    return;
  }

  // Errores de inicialización de Prisma (como conexión a la base de datos fallida)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error('Error de inicialización de Prisma:', err);
    res.status(500).json({
      error: 'Error de inicialización de Prisma',
      // message: err.message,
    });
    return;
  }

  // Errores de pánico de Rust (usados internamente por Prisma)
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    console.error('Error de pánico de Prisma:', err);
    res.status(500).json({
      error: 'Error de pánico de Prisma',
      // message: err.message,
    });
    return;
  }

  // Errores de validación de Prisma
  if (err instanceof Prisma.PrismaClientValidationError) {
    console.error('Error de validación de Prisma:', err);
    res.status(400).json({
      error: 'Error de validación de Prisma',
      // message: err.message,
    });
    return;
  }

  // En caso de otros errores desconocidos
  console.error('Error desconocido:', err);
  res.status(500).json({
    error: 'Error Interno del Servidor',
    message: 'Se produjo un error desconocido.',
  });
  return;
};
