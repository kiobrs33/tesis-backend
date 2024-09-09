import { Content } from '@prisma/client';

export interface ContentCustom extends Content {
  categories_id?: number[];
}
