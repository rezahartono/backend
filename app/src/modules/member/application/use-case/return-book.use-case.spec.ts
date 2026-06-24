import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ReturnBookUseCase } from './return-book.use-case';
import { MEMBER_REPOSITORY } from '../../domain/repositories/member.repository';
import { BOOK_REPOSITORY } from '../../domain/repositories/book.repository';
import { BORROW_RECORD_REPOSITORY } from '../../domain/repositories/borrow-record.repository';
import { Member } from '../../domain/entities/member.entity';
import { Book } from '../../domain/entities/book.entity';
import { BorrowRecord } from '../../domain/entities/borrow-record.entity';

describe('ReturnBookUseCase', () => {
  let useCase: ReturnBookUseCase;
  let memberRepo: any;
  let bookRepo: any;
  let borrowRecordRepo: any;

  beforeEach(async () => {
    const mockMemberRepo = {
      findAll: jest.fn(),
      findByCode: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const mockBookRepo = {
      findAll: jest.fn(),
      findByCode: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const mockBorrowRecordRepo = {
      findAll: jest.fn(),
      findByMemberId: jest.fn(),
      findByBookId: jest.fn(),
      findActiveByMemberId: jest.fn(),
      findActiveByBookId: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReturnBookUseCase,
        { provide: MEMBER_REPOSITORY, useValue: mockMemberRepo },
        { provide: BOOK_REPOSITORY, useValue: mockBookRepo },
        { provide: BORROW_RECORD_REPOSITORY, useValue: mockBorrowRecordRepo },
      ],
    }).compile();

    useCase = module.get<ReturnBookUseCase>(ReturnBookUseCase);
    memberRepo = module.get(MEMBER_REPOSITORY);
    bookRepo = module.get(BOOK_REPOSITORY);
    borrowRecordRepo = module.get(BORROW_RECORD_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException when member not found', async () => {
      memberRepo.findByCode.mockResolvedValue(null);

      await expect(useCase.execute('M999', 'JK-45')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when book not found', async () => {
      memberRepo.findByCode.mockResolvedValue(
        new Member({ id: 1, code: 'M001', name: 'Angga' }),
      );
      bookRepo.findByCode.mockResolvedValue(null);

      await expect(useCase.execute('M001', 'XXX')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when member has not borrowed this book', async () => {
      memberRepo.findByCode.mockResolvedValue(
        new Member({
          id: 1,
          code: 'M001',
          name: 'Angga',
          borrowedBookIds: [],
        }),
      );
      bookRepo.findByCode.mockResolvedValue(
        new Book({
          id: 1,
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
        }),
      );

      await expect(useCase.execute('M001', 'JK-45')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should successfully return a book without penalty', async () => {
      const borrowDate = new Date();
      borrowDate.setDate(borrowDate.getDate() - 3);

      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1],
      });
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [1],
      });
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate,
      });

      memberRepo.findByCode.mockResolvedValue(member);
      bookRepo.findByCode.mockResolvedValue(book);
      borrowRecordRepo.findActiveByMemberId.mockResolvedValue([record]);
      memberRepo.update.mockResolvedValue(member);
      bookRepo.update.mockResolvedValue(book);
      borrowRecordRepo.update.mockResolvedValue(record);

      const result = await useCase.execute('M001', 'JK-45');

      expect(result).toBeDefined();
      expect(result.returnDate).toBeDefined();
      expect(member.penaltyUntil).toBeNull();
    });

    it('should apply penalty when returned after 7 days', async () => {
      const borrowDate = new Date();
      borrowDate.setDate(borrowDate.getDate() - 8);

      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1],
      });
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [1],
      });
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate,
      });

      memberRepo.findByCode.mockResolvedValue(member);
      bookRepo.findByCode.mockResolvedValue(book);
      borrowRecordRepo.findActiveByMemberId.mockResolvedValue([record]);
      memberRepo.update.mockResolvedValue(member);
      bookRepo.update.mockResolvedValue(book);
      borrowRecordRepo.update.mockResolvedValue(record);

      const result = await useCase.execute('M001', 'JK-45');

      expect(result).toBeDefined();
      expect(result.returnDate).toBeDefined();
      expect(member.isPenalized()).toBe(true);
    });
  });
});
