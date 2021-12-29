import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../user/repository/user.repository';
import { MatchCardDto } from './dto/match-card.dto';

@Injectable()
export class MatchService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @description get match list by given id
   * @param id of the current user
   * @returns Promise<MatchCardDto[]>
   */
  async getUsers(id: string): Promise<MatchCardDto[]> {
    const results = await this.userRepository.findUserForMatching('id', id);

    return results.map((user) =>
      plainToClass(MatchCardDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  /**
   * @description add matched user to like list and match list (if they match each orders)
   * @param currentUserId id of current user
   * @param matchId id of matched user
   */
  async match(currentUserId: string, matchId: string) {
    const user = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );

    const matchUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      matchId,
    );

    matchUser.like.forEach((element) => {
      if (element.id === currentUserId) {
        user.matchList.push(matchUser);
        matchUser.matchList.push(user);
      }
    });

    user.like.push(matchUser);
    await this.userRepository.save(matchUser);
    await this.userRepository.save(user);
  }

  //on user dislike someone
  async dislike(currentUserId: string, targetId: string) {
    const currentUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      currentUserId,
    );
    const dislikeUser = await this.userRepository.findUserMatchInfoByField(
      'id',
      targetId,
    );
    currentUser.disLike.push(dislikeUser);
    return await this.userRepository.save(currentUser);
  }

  /**
   * @description get user's match list
   * @param id id of user
   * @returns Promise<MatchCardDto[]>
   */
  async getMatchList(id: string): Promise<MatchCardDto[]> {
    const user = await this.userRepository.findMatchList('id', id);
    return user.matchList.map((user) =>
      plainToClass(MatchCardDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
