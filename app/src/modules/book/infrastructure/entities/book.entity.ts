import { BorrowRecordEntity } from 'src/modules/book/infrastructure/entities/borrow-record.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: 1 })
  stock: number;

  @OneToMany(() => BorrowRecordEntity, (record) => record.book)
  borrowRecords: BorrowRecordEntity[];
}
