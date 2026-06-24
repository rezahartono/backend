import { Injectable, Inject } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../domain/repositories/book.repository';
import type { BookRepository } from '../../domain/repositories/book.repository';
import type { Book } from '../../domain/entities/book.entity';

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
}
