import prisma from "../../client";

export interface Challenge {
  id?: string;
  title: string;
  deadline: Date;
  duration: string;
  moneyPrize: number;
  projectDescription: string;
  projectBrief: string;
  projectTask: string;
  participantsIDs: string[];
}

export default class ChallengeService {
  static async create(challenge: Challenge) {
    return await prisma.challenge.create({ data: challenge });
  }
  static async findAll() {
    return await prisma.challenge.findMany();
  }
}
