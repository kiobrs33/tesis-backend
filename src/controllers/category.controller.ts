import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { paginate } from '../util/paginate.util';

export class CategoryController {
  private _categoryService: CategoryService;

  constructor() {
    this._categoryService = new CategoryService();
  }

  public getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { take, page } = req.query;
      const totalItems = await this._categoryService.getCountCategories();

      if (take || page) {
        const { pageVal, skipVal, takeVal, totalPages } = paginate(
          Number(page),
          Number(take),
          totalItems
        );

        const categories = await this._categoryService.getCategories(
          skipVal,
          takeVal
        );
        return res.status(200).json({
          status: 'success',
          message: 'Lista de categories.',
          data: {
            pagination: {
              total_items: totalItems,
              total_pages: totalPages,
              currrent_page: pageVal,
              item_per_page: takeVal,
            },
            items: categories,
          },
        });
      }

      const categories = await this._categoryService.getAllCategories();
      res.status(200).json({
        status: 'success',
        message: 'Lista de categories.',
        data: {
          total_items: totalItems,
          items: categories,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public getOneCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const category = await this._categoryService.getOneCategory(Number(id));

      if (!category) {
        return res.status(404).json({
          status: 'error',
          message: 'Categorie no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Categorie encontrado.',
        data: {
          item: category,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const newCategory = await this._categoryService.createCategory(body);

      res.status(200).json({
        status: 'success',
        message: 'Category creado.',
        data: {
          item: newCategory,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const category = await this._categoryService.updateCategory(
        Number(id),
        body
      );

      if (!category) {
        return res.status(404).json({
          status: 'error',
          message: 'Category no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Category actualizado.',
        data: {
          item: category,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const category = await this._categoryService.deleteCategory(Number(id));

      if (!category) {
        return res.status(404).json({
          status: 'error',
          message: 'Category no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Category eliminado',
        data: {
          item: category,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
