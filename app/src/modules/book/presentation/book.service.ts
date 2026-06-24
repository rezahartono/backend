import { Injectable } from '@nestjs/common';
import { ListBooksUseCase } from '../application/use-case/list-books.use-case';
import { BorrowBookUseCase } from '../application/use-case/borrow-book.use-case';
import { ReturnBookUseCase } from 'src/modules/book/application/use-case/return-book.use-case';
import { ListBookDTO } from '../application/dto/list-book.dto';
import { BorrowBookDto } from '../application/dto/borrow-book.dto';
import { ReturnBookDto } from '../application/dto/return-book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly borrowBookUseCase: BorrowBookUseCase,
    private readonly returnBookUseCase: ReturnBookUseCase,
  ) {}

  async showBooks(): Promise<ListBookDTO[]> {
    const books = await this.listBooksUseCase.execute();
    return books.map((book) => ({
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
      available_stock: book.getAvailableStock(),
    }));
  }

  async borrowBook(payload: BorrowBookDto) {
    const record = await this.borrowBookUseCase.execute(
      payload.member_code,
      payload.book_code,
    );

    return record;
  }

  async returnBook(payload: ReturnBookDto) {
    const record = await this.returnBookUseCase.execute(
      payload.member_code,
      payload.book_code,
    );

    return record;
  }
}
