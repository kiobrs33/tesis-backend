import { PrismaClient, User } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';

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

  public async createUser(userData: IUser): Promise<User> {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  }

  public async updateUser(
    userId: number,
    userData: IUser
  ): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        user_id: userId,
      },
      
      data: userData,
    });
    return user;
  }

  public async deleteUser(userId: number): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
    return user;
  }

  public async verifyEmailUser(userEmail: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return user;
  }

  public async countEmailOccurrences(userEmail: string): Promise<number> {
    const count = await prisma.user.count({
      where: {
        email: userEmail,
      },
    });
    return count;
  }
}
