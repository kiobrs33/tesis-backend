import { NextFunction, Response } from 'express';
import { SessionRequest } from '../interfaces/session.interface';
import { TypeUser } from '@prisma/client';

export const checkRol =
  (rol: string[]) =>
  (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const roleUser = user.type;

      console.log('here guy!');
      console.log(TypeUser);

      next();
    } catch (error: any) {
      next(error);
    }
  };
