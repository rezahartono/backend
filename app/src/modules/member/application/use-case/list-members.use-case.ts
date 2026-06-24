import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_REPOSITORY } from '../../domain/repositories/member.repository';
import type { MemberRepository } from '../../domain/repositories/member.repository';
import type { Member } from '../../domain/entities/member.entity';

@Injectable()
export class ListMembersUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepository: MemberRepository,
  ) {}

  async execute(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }
}
