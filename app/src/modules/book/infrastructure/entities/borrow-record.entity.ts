import { BookEntity } from 'src/modules/book/infrastructure/entities/book.entity';
import { MemberEntity } from 'src/modules/member/infrastructure/entities/member.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('borrow_records')
export class BorrowRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberId: number;

  @Column()
  bookId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date | null;

  @ManyToOne(() => MemberEntity, (member) => member.borrowRecords)
  @JoinColumn({ name: 'memberId' })
  member: MemberEntity;

  @ManyToOne(() => BookEntity, (book) => book.borrowRecords)
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;
}
