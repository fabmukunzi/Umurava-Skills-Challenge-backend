import prisma from "../../client";

export interface Challenge {
  id: string;
  title: string;
  category: string;
  deadline: Date;
  duration: string;
  moneyPrize: number;
  projectDescription: string;
  projectBrief: string;
  projectTask: string;
  participantsIDs?: string[];
}

export default class ChallengeService {
  static async create(challenge: Challenge) {
    return await prisma.challenge.create({ data: challenge });
  }
  static async findAll() {
    return await prisma.challenge.findMany();
  }
  static async findByName(title: string) {
    return await prisma.challenge.findUnique({ where: { title } });
  }

  static async findById(id: string) {
    return await prisma.challenge.findUnique({ where: { id } });
  }

  static async update(id: string, challenge: Challenge) {
    return await prisma.challenge.update({
      where: { id },
      data: challenge,
    });
  }
  static async delete(id: string) {
    return await prisma.challenge.delete({
      where: { id },
    });
  }
}
