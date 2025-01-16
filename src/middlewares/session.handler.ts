import { NextFunction, Response } from 'express';
import { JwtUtil } from '../util/jwt.util';
import { UserService } from '../services/user.service';
import { SessionRequest } from '../interfaces/session.interface';

export const validateJwt = async (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Evaluando el authorization
    if (!req.headers.authorization) {
      res.status(400).json({
        ok: false,
        status: 'error',
        message: 'No tienes autorizacion para esta URL.',
      });
      return;
    }

    // Beaber Token
    const token = req.headers.authorization.split(' ').pop();
    const jwtUtil = new JwtUtil();
    const valueToken = await jwtUtil.verifyJwt(token);

    // Evaluando el ID del usuario
    if (!valueToken.userId) {
      res.status(400).json({
        ok: false,
        status: 'error',
        message: 'No se puede obtener userId token.',
      });
      return;
    }

    const userService = new UserService();
    const user = await userService.getOneUser(Number(valueToken.userId));

    req.user = user;

    next();
  } catch (error: any) {
    next(error);
  }
};
