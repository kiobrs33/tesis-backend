import { Promotion, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PromotionService {
  public async getAllPromotions(): Promise<Promotion[]> {
    const promotions = await prisma.promotion.findMany({});
    return promotions;
  }

  public async getPromotions(skip: number, take: number): Promise<Promotion[]> {
    const promotions = await prisma.promotion.findMany({
      skip,
      take,
    });
    return promotions;
  }

  public async getOnePromotion(id: number): Promise<Promotion | null> {
    const promotion = prisma.promotion.findUnique({
      where: {
        promotion_id: id,
      },
    });
    return promotion;
  }

  public async getCountPromotions(): Promise<number> {
    const count = prisma.promotion.count();
    return count;
  }

  public async createPromotion(data: Promotion): Promise<Promotion> {
    const promotion = await prisma.promotion.create({
      data,
    });
    return promotion;
  }

  public async updatePromotion(
    id: number,
    data: Promotion
  ): Promise<Promotion | null> {
    const promotion = await prisma.promotion.update({
      where: {
        promotion_id: id,
      },
      data,
    });
    return promotion;
  }

  public async deletePromotion(id: number): Promise<Promotion | null> {
    const promotion = await prisma.promotion.delete({
      where: {
        promotion_id: id,
      },
    });
    return promotion;
  }
}
