import { Request, Response, NextFunction } from 'express';
import { PromotionService } from '../services/promotion.service';
import { paginate } from '../util/paginate.util';

export class PromotionController {
  private _promotionService: PromotionService;

  constructor() {
    this._promotionService = new PromotionService();
  }

  public getPromotions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { take, page } = req.query;
      const totalItems = await this._promotionService.getCountPromotions();

      if (take || page) {
        const { pageVal, skipVal, takeVal, totalPages } = paginate(
          Number(page),
          Number(take),
          totalItems
        );

        const promotions = await this._promotionService.getPromotions(
          skipVal,
          takeVal
        );
        return res.status(200).json({
          status: 'success',
          message: 'Lista de promotions.',
          data: {
            pagination: {
              total_items: totalItems,
              total_pages: totalPages,
              currrent_page: pageVal,
              item_per_page: takeVal,
            },
            items: promotions,
          },
        });
      }

      const promotions = await this._promotionService.getAllPromotions();
      res.status(200).json({
        status: 'success',
        message: 'Lista de promotions.',
        data: {
          total_items: totalItems,
          items: promotions,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public getOnePromotion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const promotion = await this._promotionService.getOnePromotion(
        Number(id)
      );

      if (!promotion) {
        return res.status(404).json({
          status: 'error',
          message: 'Promotion no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Promotion encontrado.',
        data: {
          item: promotion,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public createPromotion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const newPromotion = await this._promotionService.createPromotion(body);

      res.status(200).json({
        status: 'success',
        message: 'Promotion creado.',
        data: {
          item: newPromotion,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public updatePromotion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const promotion = await this._promotionService.updatePromotion(
        Number(id),
        body
      );

      if (!promotion) {
        return res.status(404).json({
          status: 'error',
          message: 'Promotion no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Promotion actualizado.',
        data: {
          item: promotion,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public deletePromotion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const promotion = await this._promotionService.deletePromotion(
        Number(id)
      );

      if (!promotion) {
        return res.status(404).json({
          status: 'error',
          message: 'Promotion no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Promotion eliminado',
        data: {
          item: promotion,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
