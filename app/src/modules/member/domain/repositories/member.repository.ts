import { Member } from '../entities/member.entity';

export const MEMBER_REPOSITORY = 'MEMBER_REPOSITORY';

export interface MemberRepository {
  findAll(): Promise<Member[]>;
  findByCode(code: string): Promise<Member | null>;
  findById(id: number): Promise<Member | null>;
  save(member: Member): Promise<Member>;
  update(member: Member): Promise<Member>;
}
