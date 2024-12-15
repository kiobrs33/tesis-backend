import { NextFunction, Request, Response } from 'express';
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Si existe codigo de error de PRISMA, aqui se mostrará
  if (error.code) {
    return res.status(400).json({
      status: 'error',
      message: error.meta,
    });
  }

  // Otros errores
  console.error(error);
  res.status(500).json({
    status: 'error',
    message: 'A ocurrido un problema! - Error Handler',
  });
};
