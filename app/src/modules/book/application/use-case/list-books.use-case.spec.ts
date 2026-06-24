import { Test, TestingModule } from '@nestjs/testing';
import { ListBooksUseCase } from './list-books.use-case';
import { BOOK_REPOSITORY } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';

describe('ListBooksUseCase', () => {
  let useCase: ListBooksUseCase;
  let bookRepo: any;

  beforeEach(async () => {
    const mockBookRepo = { findAll: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListBooksUseCase,
        { provide: BOOK_REPOSITORY, useValue: mockBookRepo },
      ],
    }).compile();

    useCase = module.get<ListBooksUseCase>(ListBooksUseCase);
    bookRepo = module.get(BOOK_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all books', async () => {
      const books = [
        new Book({
          id: 1,
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
        }),
        new Book({
          id: 2,
          code: 'SHR-1',
          title: 'A Study in Scarlet',
          author: 'Arthur Conan Doyle',
          stock: 1,
        }),
      ];
      bookRepo.findAll.mockResolvedValue(books);

      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0].code).toBe('JK-45');
      expect(result[1].code).toBe('SHR-1');
      expect(bookRepo.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no books', async () => {
      bookRepo.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toHaveLength(0);
    });
  });
});
