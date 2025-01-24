import prisma from "../../client";

export default interface User {
  id?: string;
  email: string;
  name: string;
  password: string;
  role: string;
  profilePicture: string;
}

export default class UserService {
  static async create(user: User) {
    return await prisma.user.create({ data: user });
  }
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  static async findUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
  static async findAll() {
    return await prisma.user.findMany();
  }
}
