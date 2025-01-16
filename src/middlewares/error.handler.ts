import { NextFunction, Request, Response } from 'express';
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Si existe codigo de error de PRISMA, aqui se mostrará
  if (error.code) {
    res.status(400).json({
      ok: false,
      status: 'error',
      message: error.meta,
    });
    return;
  }

  // Otros errores
  console.error(error);
  res.status(500).json({
    ok: false,
    status: 'error',
    message: 'A ocurrido un problema! - Error Handler',
  });
};
