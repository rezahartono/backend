import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { MemberEntity } from '../entities/member.entity';
import { Member } from '../../domain/entities/member.entity';

@Injectable()
export class MemberRepositoryImpl implements MemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {}

  findAll = async (): Promise<Member[]> => {
    const entities = await this.memberRepo.find({
      relations: { borrowRecords: true },
    });
    return entities.map(this.toDomain);
  };

  findByCode = async (code: string): Promise<Member | null> => {
    const entity = await this.memberRepo.findOne({
      where: { code },
      relations: { borrowRecords: true },
    });
    return entity ? this.toDomain(entity) : null;
  };

  findById = async (id: number): Promise<Member | null> => {
    const entity = await this.memberRepo.findOne({
      where: { id },
      relations: { borrowRecords: true },
    });
    return entity ? this.toDomain(entity) : null;
  };

  save = async (member: Member): Promise<Member> => {
    const entity = this.toEntity(member);
    const saved = await this.memberRepo.save(entity);
    return this.toDomain(saved);
  };

  update = async (member: Member): Promise<Member> => {
    const entity = this.toEntity(member);
    await this.memberRepo.update(member.id, entity);
    return member;
  };

  private toDomain = (entity: MemberEntity): Member => {
    const borrowedBookIds = entity.borrowRecords
      ? entity.borrowRecords
          .filter((record) => !record.returnDate)
          .map((record) => record.bookId)
      : [];

    return new Member({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      penaltyUntil: entity.penaltyUntil,
      borrowedBookIds,
    });
  };

  private toEntity = (member: Member): Partial<MemberEntity> => {
    return {
      id: member.id,
      code: member.code,
      name: member.name,
      penaltyUntil: member.penaltyUntil,
    };
  };
}
