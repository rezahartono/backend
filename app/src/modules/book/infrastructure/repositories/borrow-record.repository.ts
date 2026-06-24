import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { BorrowRecordRepository } from '../../domain/repositories/borrow-record.repository';
import { BorrowRecordEntity } from '../entities/borrow-record.entity';
import { BorrowRecord } from '../../domain/entities/borrow-record.entity';

@Injectable()
export class BorrowRecordRepositoryImpl implements BorrowRecordRepository {
  constructor(
    @InjectRepository(BorrowRecordEntity)
    private readonly borrowRecordRepo: Repository<BorrowRecordEntity>,
  ) {}

  findAll = async (): Promise<BorrowRecord[]> => {
    const entities = await this.borrowRecordRepo.find();
    return entities.map(this.toDomain);
  };

  findByMemberId = async (memberId: number): Promise<BorrowRecord[]> => {
    const entities = await this.borrowRecordRepo.find({
      where: { memberId },
    });
    return entities.map(this.toDomain);
  };

  findByBookId = async (bookId: number): Promise<BorrowRecord[]> => {
    const entities = await this.borrowRecordRepo.find({
      where: { bookId },
    });
    return entities.map(this.toDomain);
  };

  findActiveByMemberId = async (memberId: number): Promise<BorrowRecord[]> => {
    const entities = await this.borrowRecordRepo.find({
      where: { memberId, returnDate: IsNull() },
    });
    return entities.map(this.toDomain);
  };

  findActiveByBookId = async (bookId: number): Promise<BorrowRecord | null> => {
    const entity = await this.borrowRecordRepo.findOne({
      where: { bookId, returnDate: IsNull() },
    });
    return entity ? this.toDomain(entity) : null;
  };

  save = async (record: BorrowRecord): Promise<BorrowRecord> => {
    const entity = this.toEntity(record);
    const saved = await this.borrowRecordRepo.save(entity);
    return this.toDomain(saved);
  };

  update = async (record: BorrowRecord): Promise<BorrowRecord> => {
    await this.borrowRecordRepo.update(record.id, this.toEntity(record));
    return record;
  };

  private toDomain = (entity: BorrowRecordEntity): BorrowRecord => {
    return new BorrowRecord({
      id: entity.id,
      memberId: entity.memberId,
      bookId: entity.bookId,
      borrowDate: entity.borrowDate,
      returnDate: entity.returnDate,
    });
  };

  private toEntity = (record: BorrowRecord): Partial<BorrowRecordEntity> => {
    return {
      id: record.id,
      memberId: record.memberId,
      bookId: record.bookId,
      borrowDate: record.borrowDate,
      returnDate: record.returnDate,
    };
  };
}
