import prisma from "../../client";
import User from "../dtos/user.dto";

export default class UserService {
  static async create(user: User) {
    return await prisma.user.create({ data: user });
  }
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { challenges: true },
    });
  }
  static async findAll(take = 10, skip = 0) {
    return await prisma.user.findMany({
      take,
      skip,
      include: { challenges: true },
    });
  }
}
