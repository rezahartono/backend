import { Injectable } from '@nestjs/common';
import { ListMembersUseCase } from '../application/use-case/list-members.use-case';
import { ListMemberDTO } from '../application/dto/list-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly listMembersUseCase: ListMembersUseCase) {}
  async showMembers(): Promise<ListMemberDTO[]> {
    const members = await this.listMembersUseCase.execute();
    const result: ListMemberDTO[] = members.map((member) => ({
      code: member.code,
      name: member.name,
      borrowed_books_count: member.borrowedBookIds.length,
      is_penalized: member.isPenalized(),
      penalty_until: member.penaltyUntil,
    }));
    return result;
  }
}
