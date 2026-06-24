import { Book } from '../entities/book.entity';

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findByCode(code: string): Promise<Book | null>;
  findById(id: number): Promise<Book | null>;
  save(book: Book): Promise<Book>;
  update(book: Book): Promise<Book>;
}
