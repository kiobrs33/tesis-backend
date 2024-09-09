import { Ranking, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RankingService {
  public async getAllRankings(): Promise<Ranking[]> {
    const rankings = await prisma.ranking.findMany({});
    return rankings;
  }

  public async getRankings(skip: number, take: number): Promise<Ranking[]> {
    const rankings = await prisma.ranking.findMany({
      skip,
      take,
    });
    return rankings;
  }

  public async getOneRanking(id: number): Promise<Ranking | null> {
    const ranking = prisma.ranking.findUnique({
      where: {
        raking_id: id,
      },
    });
    return ranking;
  }

  public async getCountRankings(): Promise<number> {
    const count = prisma.ranking.count();
    return count;
  }

  public async createRanking(data: Ranking): Promise<Ranking> {
    const ranking = await prisma.ranking.create({
      data,
    });
    return ranking;
  }

  public async updateRanking(
    id: number,
    data: Ranking
  ): Promise<Ranking | null> {
    const ranking = await prisma.ranking.update({
      where: {
        raking_id: id,
      },
      data,
    });
    return ranking;
  }

  public async deleteRanking(id: number): Promise<Ranking | null> {
    const ranking = await prisma.ranking.delete({
      where: {
        raking_id: id,
      },
    });
    return ranking;
  }
}
