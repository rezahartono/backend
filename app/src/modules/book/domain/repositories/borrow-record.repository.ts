import { BorrowRecord } from '../entities/borrow-record.entity';

export const BORROW_RECORD_REPOSITORY = 'BORROW_RECORD_REPOSITORY';

export interface BorrowRecordRepository {
  findAll(): Promise<BorrowRecord[]>;
  findByMemberId(memberId: number): Promise<BorrowRecord[]>;
  findByBookId(bookId: number): Promise<BorrowRecord[]>;
  findActiveByMemberId(memberId: number): Promise<BorrowRecord[]>;
  findActiveByBookId(bookId: number): Promise<BorrowRecord | null>;
  save(record: BorrowRecord): Promise<BorrowRecord>;
  update(record: BorrowRecord): Promise<BorrowRecord>;
}
