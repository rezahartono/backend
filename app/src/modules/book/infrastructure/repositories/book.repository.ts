import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
  ) {}

  findAll = async (): Promise<Book[]> => {
    const entities = await this.bookRepo.find({
      relations: { borrowRecords: true },
    });
    return entities.map(this.toDomain);
  };

  findByCode = async (code: string): Promise<Book | null> => {
    const entity = await this.bookRepo.findOne({
      where: { code },
      relations: { borrowRecords: true },
    });
    return entity ? this.toDomain(entity) : null;
  };

  findById = async (id: number): Promise<Book | null> => {
    const entity = await this.bookRepo.findOne({
      where: { id },
      relations: { borrowRecords: true },
    });
    return entity ? this.toDomain(entity) : null;
  };

  save = async (book: Book): Promise<Book> => {
    const entity = this.toEntity(book);
    const saved = await this.bookRepo.save(entity);
    return this.toDomain(saved);
  };

  update = async (book: Book): Promise<Book> => {
    const entity = this.toEntity(book);
    await this.bookRepo.update(book.id, entity);
    return book;
  };

  private toDomain = (entity: BookEntity): Book => {
    const borrowedByMemberIds = entity.borrowRecords
      ? entity.borrowRecords
          .filter((record) => !record.returnDate)
          .map((record) => record.memberId)
      : [];

    return new Book({
      id: entity.id,
      code: entity.code,
      title: entity.title,
      author: entity.author,
      stock: entity.stock,
      borrowedByMemberIds,
    });
  };

  private toEntity = (book: Book): Partial<BookEntity> => {
    return {
      id: book.id,
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
    };
  };
}
