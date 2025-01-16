import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { BcryptUtil } from '../util/bcrypt.util';
import { JwtUtil } from '../util/jwt.util';
import { ILoginUser, IUser } from '../interfaces/user.interface';

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
    req: Request<{}, {}, ILoginUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, email } = req.body;
      const user = await this._userService.verifyEmailUser(email);

      // Verificando si el correo electronico existe
      if (!user) {
        res.status(400).json({
          ok: false,
          status: 'error',
          message: 'El correo electronico es incorrecto.',
        });
        return;
      }

      // Verificando la contraseña
      const validPassword = await this._bcryptUtil.compare(
        password,
        user.password
      );

      if (!validPassword) {
        res.status(400).json({
          ok: false,
          status: 'error',
          message: 'La contraseña es incorrecta.',
        });
        return;
      }

      // Generando el token con JWT
      const userId = String(user.user_id);
      const token = await this._jwtUtil.generateJwt(userId);

      res.status(200).json({
        ok: true,
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

  // Request<ParamsDictionary, ResBody, ReqBody, ReqQuery>
  public postRegister = async (
    req: Request<{}, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      // Encriptando la contraseña
      const hashPassword = await this._bcryptUtil.encrypt(body.password);
      body.password = hashPassword;

      // Creando el usuario
      const user = await this._userService.createUser(body);

      // Generando el token con JWT
      const userId = String(user.user_id);
      const token = await this._jwtUtil.generateJwt(userId);

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario creado.',
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
