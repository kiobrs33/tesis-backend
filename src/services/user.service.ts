import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  constructor() {}

  public async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({});
    return users;
  }

  public async getUsers(skip: number, take: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      skip,
      take,
    });
    return users;
  }

  public async getOneUser(userId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    return user;
  }

  public async getCountUsers(): Promise<number> {
    const count = prisma.user.count();
    return count;
  }

  public async createUser(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        email: data.email,
        password: data.password,
        type: data.type,
      },
    });
    return user;
  }

  public async updateUser(id: number, data: User): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        user_id: id,
      },
      data,
    });
    return user;
  }

  public async deleteUser(id: number): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        user_id: id,
      },
    });
    return user;
  }

  public async verifyEmailUser(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
