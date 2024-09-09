import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { paginate } from '../util/paginate.util';
import { BcryptUtil } from '../util/bcrypt.util';
import { JwtUtil } from '../util/jwt.util';

export class UserController {
  private _userService: UserService;
  private _bcryptUtil: BcryptUtil;
  private _jwtUtil: JwtUtil;

  constructor() {
    this._userService = new UserService();
    this._bcryptUtil = new BcryptUtil();
    this._jwtUtil = new JwtUtil();

    // Permite referenciar y mantener el contexto de la instancia del objeto "ContentController"
    // Evita que "this._contentService" no sea undefined y se pueda invocar esta variable
    this.getUsers = this.getUsers.bind(this);
    this.getOneUser = this.getOneUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let { take, page } = req.query;
      const totalItems = await this._userService.getCountUsers();

      if (take || page) {
        const { pageVal, skipVal, takeVal, totalPages } = paginate(
          Number(page),
          Number(take),
          totalItems
        );

        const users = await this._userService.getUsers(skipVal, takeVal);

        return res.status(200).json({
          status: 'success',
          message: 'Lista de users',
          data: {
            pagination: {
              total_items: totalItems,
              total_pages: totalPages,
              currrent_page: pageVal,
              item_per_page: takeVal,
            },
            items: users,
          },
        });
      }

      const users = await this._userService.getAllUsers();

      res.status(200).json({
        status: 'success',
        message: 'Lista de users',
        data: {
          total_items: totalItems,
          items: users,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async getOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this._userService.getOneUser(Number(id));

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User no encontrado',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'User encontrado',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      // Encriptando Password
      const hashPassword = await this._bcryptUtil.encrypt(body.password);
      body.password = hashPassword;

      const user = await this._userService.createUser(body);

      // Generar el JWT
      const userId = String(user.user_id);
      const token = await this._jwtUtil.generateJwt(userId);

      res.status(200).json({
        status: 'success',
        message: 'User creado.',
        data: {
          user,
          token,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.password) {
        // Encriptando Password
        const hashPassword = await this._bcryptUtil.encrypt(body.password);
        body.password = hashPassword;
      }

      const user = await this._userService.updateUser(Number(id), body);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User no encontrado',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'User actualizado',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await this._userService.deleteUser(Number(id));

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User no encontrado',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'User eliminado',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
}
