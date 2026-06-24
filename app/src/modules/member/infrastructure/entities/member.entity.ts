import { BorrowRecordEntity } from 'src/modules/book/infrastructure/entities/borrow-record.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('members')
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  penaltyUntil: Date | null;

  @OneToMany(() => BorrowRecordEntity, (record) => record.member)
  borrowRecords: BorrowRecordEntity[];
}
