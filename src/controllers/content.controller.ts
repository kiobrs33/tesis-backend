import { Request, Response, NextFunction, request, response } from 'express';
import { ContentService } from '../services/content.service';
import { paginate } from '../util/paginate.util';

export class ContentController {
  private _contentService: ContentService;

  constructor() {
    this._contentService = new ContentService();
  }

  public getContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { take, page } = req.query;
      const totalContents = await this._contentService.getCountContents();

      if (take || page) {
        const { pageVal, skipVal, takeVal, totalPages } = paginate(
          Number(page),
          Number(take),
          totalContents
        );

        const contents = await this._contentService.getContents(
          skipVal,
          takeVal
        );
        return res.status(200).json({
          status: 'success',
          message: 'Lista de contents.',
          data: {
            pagination: {
              total_items: totalContents,
              total_pages: totalPages,
              currrent_page: pageVal,
              item_per_page: takeVal,
            },
            items: contents,
          },
        });
      }

      const contents = await this._contentService.getAllContents();
      res.status(200).json({
        status: 'success',
        message: 'Lista de contents.',
        data: {
          total_items: totalContents,
          items: contents,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getOneContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const content = await this._contentService.getOneContent(Number(id));

      if (!content) {
        return res.status(404).json({
          status: 'error',
          message: 'Content no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Content encontrado.',
        data: {
          item: content,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public createContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const newContent = await this._contentService.createContent(body);

      res.status(200).json({
        status: 'success',
        message: 'Content creado.',
        data: {
          item: newContent,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public updateContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { categories_id, ...rest } = req.body;
      let content: any;

      if (categories_id.length >= 1) {
        content = await this._contentService.updateContentAndCategories(
          Number(id),
          { categories_id, ...rest }
        );
      }

      content = await this._contentService.updateContent(Number(id), {
        ...rest,
      });

      if (!content) {
        return res.status(404).json({
          status: 'error',
          message: 'Content no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Content actualizado.',
        data: {
          item: content,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      // const pi = await this._contentService.deleteCategoriesFromContent(
      //   Number(id)
      // );
      // console.log(pi);
      const content = await this._contentService.deleteContent(Number(id));

      if (!content) {
        return res.status(404).json({
          status: 'error',
          message: 'Content no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Content eliminado',
        data: {
          item: content,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
