import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryService {
  public async getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany({});
    return categories;
  }

  public async getCategories(skip: number, take: number): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      skip,
      take,
    });
    return categories;
  }

  public async getOneCategory(id: number): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        category_id: id,
      },
    });
    return category;
  }

  public async getCountCategories(): Promise<number> {
    const count = prisma.category.count();
    return count;
  }

  public async createCategory(data: Category): Promise<Category> {
    const category = await prisma.category.create({
      data,
    });
    return category;
  }

  public async updateCategory(
    id: number,
    data: Category
  ): Promise<Category | null> {
    const category = await prisma.category.update({
      where: {
        category_id: id,
      },
      data,
    });
    return category;
  }

  public async deleteCategory(id: number): Promise<Category | null> {
    const category = await prisma.category.delete({
      where: {
        category_id: id,
      },
    });
    return category;
  }
}
