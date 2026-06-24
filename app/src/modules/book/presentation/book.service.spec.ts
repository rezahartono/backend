import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { ReturnBookUseCase } from '../application/use-case/return-book.use-case';
import { BorrowBookUseCase } from '../application/use-case/borrow-book.use-case';
import { ListBooksUseCase } from '../application/use-case/list-books.use-case';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: ListBooksUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },

        {
          provide: BorrowBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },

        {
          provide: ReturnBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
