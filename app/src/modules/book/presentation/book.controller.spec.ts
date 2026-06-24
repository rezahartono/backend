import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ListBooksUseCase } from '../application/use-case/list-books.use-case';
import { BorrowBookUseCase } from '../application/use-case/borrow-book.use-case';
import { ReturnBookUseCase } from '../application/use-case/return-book.use-case';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
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

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
