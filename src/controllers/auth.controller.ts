import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { BcryptUtil } from '../util/bcrypt.util';
import { JwtUtil } from '../util/jwt.util';

export class AuthServices {
  private _userService: UserService;
  private _bcryptUtil: BcryptUtil;
  private _jwtUtil: JwtUtil;

  constructor() {
    this._userService = new UserService();
    this._bcryptUtil = new BcryptUtil();
    this._jwtUtil = new JwtUtil();
  }

  public postLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, email } = req.body;
      const user = await this._userService.verifyEmailUser(email);

      // Verificar si user existe
      if (!user) {
        return res.status(400).json({
          status: 'error',
          message: 'El email es incorrecto.',
        });
      }

      // Verificar el password
      const validPassword = await this._bcryptUtil.compare(
        password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'El passowrd es incorrecto.',
        });
      }

      // Generar el JWT
      const userId = String(user.user_id);
      const token = await this._jwtUtil.generateJwt(userId);

      res.status(200).json({
        status: 'success',
        message: 'Token generado.',
        data: {
          token,
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
