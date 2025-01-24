import prisma from "../../client";
import {
  CreateChallengeDTO,
  ChallengeResponseDTO,
} from "../dtos/challenge.dto";

export default class ChallengeService {
  // Create challenge using DTO
  static async create(
    challengeData: CreateChallengeDTO
  ): Promise<ChallengeResponseDTO> {
    const challenge = await prisma.challenge.create({
      data: challengeData,
    });

    // Return only necessary fields for response
    return this.toResponseDTO(challenge);
  }

  // Find all challenges with pagination
  static async findAll(take = 10, skip = 0): Promise<ChallengeResponseDTO[]> {
    const challenges = await prisma.challenge.findMany({
      take,
      skip,
      include: { participants: true },
    });
    return challenges.map(this.toResponseDTO);
  }

  // Find challenge by title
  static async findByName(title: string): Promise<ChallengeResponseDTO | null> {
    const challenge = await prisma.challenge.findUnique({ where: { title } });
    return challenge ? this.toResponseDTO(challenge) : null;
  }

  // Find challenge by ID
  static async findById(id: string): Promise<ChallengeResponseDTO | null> {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: { participants: true },
    });

    return challenge ? this.toResponseDTO(challenge) : null;
  }

  // Update challenge
  static async update(
    id: string,
    challengeData: CreateChallengeDTO
  ): Promise<ChallengeResponseDTO> {
    const updatedChallenge = await prisma.challenge.update({
      where: { id },
      data: challengeData,
    });

    return this.toResponseDTO(updatedChallenge);
  }

  // Delete challenge
  static async delete(id: string): Promise<{ message: string }> {
    await prisma.challenge.delete({
      where: { id },
    });

    return { message: "Challenge deleted successfully" };
  }

  // Helper method to transform DB model to response DTO
  private static toResponseDTO(challenge: any): ChallengeResponseDTO {
    return {
      id: challenge.id,
      title: challenge.title,
      category: challenge.category,
      deadline: challenge.deadline,
      duration: challenge.duration,
      moneyPrize: challenge.moneyPrize,
      projectDescription: challenge.projectDescription,
      projectBrief: challenge.projectBrief,
      projectTask: challenge.projectTask,
      participantsIDs: challenge.participantsIDs || [],
      participants: challenge.participants || [],
    };
  }
}
