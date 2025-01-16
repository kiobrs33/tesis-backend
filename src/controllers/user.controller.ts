import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { paginate } from '../util/paginate.util';
import { BcryptUtil } from '../util/bcrypt.util';
import { IQuerysUser, IParamsUser, IUser } from '../interfaces/user.interface';

export class UserController {
  private _userService: UserService;
  private _bcryptUtil: BcryptUtil;

  constructor() {
    this._userService = new UserService();
    this._bcryptUtil = new BcryptUtil();

    // Permite referenciar y mantener el contexto de la instancia del objeto "ContentController"
    // Evita que "this._contentService" no sea undefined y se pueda invocar esta variable
    // OBSERVACIÓN:Para evitar este codigo, se puede usar "Arrow Functions" que soluciona este problema
    this.getUsers = this.getUsers.bind(this);
    this.getOneUser = this.getOneUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // Request<ParamsDictionary, ResBody, ReqBody, ReqQuery>
  public async getUsers(
    req: Request<{}, {}, {}, IQuerysUser>,
    res: Response,
    next: NextFunction
  ) {
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

        res.status(200).json({
          ok: true,
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
        return;
      }

      const users = await this._userService.getAllUsers();

      res.status(200).json({
        ok: true,
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

  public async getOneUser(
    req: Request<IParamsUser, {}, {}, {}>,
    // req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const user = await this._userService.getOneUser(Number(id));

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'User no encontrado',
        });
        return;
      }

      res.status(200).json({
        ok: true,
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

  public async createUser(
    req: Request<{}, {}, IUser, {}>,
    // req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;

      // Encriptando la contraseña
      const hashPassword = await this._bcryptUtil.encrypt(body.password);
      body.password = hashPassword;

      const user = await this._userService.createUser(body);

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'User creado.',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async updateUser(
    req: Request<IParamsUser, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.password) {
        // Encriptando la contraseña
        const hashPassword = await this._bcryptUtil.encrypt(body.password);
        body.password = hashPassword;
      }

      const user = await this._userService.updateUser(Number(id), body);

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'User no encontrado',
        });
        return;
      }

      res.status(200).json({
        ok: true,
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

  public async deleteUser(
    req: Request<IParamsUser, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const user = await this._userService.deleteUser(Number(id));

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'User no encontrado',
        });
        return;
      }

      res.status(200).json({
        ok: true,
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
