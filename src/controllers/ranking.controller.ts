import { NextFunction, Request, Response } from 'express';
import { RankingService } from '../services/ranking.service';
import { paginate } from '../util/paginate.util';

export class RankingController {
  private _rankingService: RankingService;

  constructor() {
    this._rankingService = new RankingService();
  }

  public getRankings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { take, page } = req.query;
      const totalItems = await this._rankingService.getCountRankings();

      if (take || page) {
        const { pageVal, skipVal, takeVal, totalPages } = paginate(
          Number(page),
          Number(take),
          totalItems
        );

        const rankings = await this._rankingService.getRankings(
          skipVal,
          takeVal
        );

        return res.status(200).json({
          status: 'success',
          message: 'Lista de rankings.',
          data: {
            pagination: {
              total_items: totalItems,
              total_pages: totalPages,
              currrent_page: pageVal,
              item_per_page: takeVal,
            },
            items: rankings,
          },
        });
      }

      const rankings = await this._rankingService.getAllRankings();
      res.status(200).json({
        status: 'success',
        message: 'Lista de rankings.',
        data: {
          total_items: totalItems,
          items: rankings,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public getOneRanking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const ranking = await this._rankingService.getOneRanking(Number(id));

      if (!ranking) {
        return res.status(404).json({
          status: 'error',
          message: 'Ranking no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Ranking encontrado.',
        data: {
          item: ranking,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public createRanking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const newRanking = await this._rankingService.createRanking(body);

      res.status(200).json({
        status: 'success',
        message: 'Ranking creado.',
        data: {
          item: newRanking,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public updateRanking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const ranking = await this._rankingService.updateRanking(
        Number(id),
        body
      );

      if (!ranking) {
        return res.status(404).json({
          status: 'error',
          message: 'Ranking no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Ranking actualizado.',
        data: {
          item: ranking,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteRanking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const ranking = await this._rankingService.deleteRanking(Number(id));

      if (!ranking) {
        return res.status(404).json({
          status: 'error',
          message: 'Ranking no encontrado.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Ranking eliminado',
        data: {
          item: ranking,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
