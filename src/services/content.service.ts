import { Content, PrismaClient } from '@prisma/client';
import { ContentCustom } from '../interfaces/prisma.interface';

const prisma = new PrismaClient();

export class ContentService {
  public async getAllContents(): Promise<Content[]> {
    const contents = await prisma.content.findMany({});
    return contents;
  }

  public async getContents(skip: number, take: number): Promise<Content[]> {
    const contents = await prisma.content.findMany({
      skip,
      take,
    });
    return contents;
  }

  public async getOneContent(id: number): Promise<any | null> {
    const content = prisma.content.findUnique({
      where: {
        content_id: id,
      },
      select: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return content;
  }

  public async getCountContents(): Promise<number> {
    const count = prisma.content.count();
    return count;
  }

  public async createContent(data: ContentCustom): Promise<Content> {
    const { categories_id, ...rest } = data;
    const content = await prisma.content.create({
      data: {
        ...rest,
        categories: {
          create: categories_id?.map((id) => ({
            category: {
              connect: {
                category_id: id,
              },
            },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return content;
  }

  public async updateContent(id: number, data: Content): Promise<any | null> {
    const content = await prisma.content.update({
      where: {
        content_id: id,
      },
      data,
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return content;
  }

  public async updateContentAndCategories(
    id: number,
    data: ContentCustom
  ): Promise<any | null> {
    const { categories_id, ...rest } = data;
    const content = await prisma.content.update({
      where: {
        content_id: id,
      },
      data: {
        ...rest,
        categories: {
          deleteMany: {},
          create: categories_id?.map((catId) => ({
            category: { connect: { category_id: catId } },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return content;
  }

  public async deleteContent(id: number): Promise<Content | null> {
    const content = await prisma.content.delete({
      where: {
        content_id: id,
      },
    });
    return content;
  }

  public async deleteCategoriesFromContent(id: number): Promise<any | null> {
    const content = await prisma.content.update({
      where: {
        content_id: id,
      },
      data: {
        categories: {
          deleteMany: {},
        },
      },
    });
    return content;
  }
}
