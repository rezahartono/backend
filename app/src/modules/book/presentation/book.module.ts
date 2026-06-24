import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ListBooksUseCase } from '../application/use-case/list-books.use-case';
import { BorrowBookUseCase } from '../application/use-case/borrow-book.use-case';
import { ReturnBookUseCase } from '../application/use-case/return-book.use-case';
import { BOOK_REPOSITORY } from '../domain/repositories/book.repository';
import { BookRepositoryImpl } from '../infrastructure/repositories/book.repository';
import { BORROW_RECORD_REPOSITORY } from '../domain/repositories/borrow-record.repository';
import { BorrowRecordRepositoryImpl } from '../infrastructure/repositories/borrow-record.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../infrastructure/entities/book.entity';
import { BorrowRecordEntity } from '../infrastructure/entities/borrow-record.entity';
import { MemberModule } from 'src/modules/member/presentation/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, BorrowRecordEntity]),
    MemberModule,
  ],
  controllers: [BookController],
  providers: [
    BookService,
    ListBooksUseCase,
    BorrowBookUseCase,
    ReturnBookUseCase,
    {
      provide: BOOK_REPOSITORY,
      useClass: BookRepositoryImpl,
    },
    {
      provide: BORROW_RECORD_REPOSITORY,
      useClass: BorrowRecordRepositoryImpl,
    },
  ],
  exports: [BOOK_REPOSITORY],
})
export class BookModule {}
