import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import {
  MEMBER_REPOSITORY,
  type MemberRepository,
} from 'src/modules/member/domain/repositories/member.repository';
import { BorrowRecord } from '../../domain/entities/borrow-record.entity';
import {
  BOOK_REPOSITORY,
  type BookRepository,
} from '../../domain/repositories/book.repository';
import {
  BORROW_RECORD_REPOSITORY,
  type BorrowRecordRepository,
} from '../../domain/repositories/borrow-record.repository';
import { BorrowResponseDTO } from '../dto/borrow-response.dto';

@Injectable()
export class BorrowBookUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepository: MemberRepository,
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    @Inject(BORROW_RECORD_REPOSITORY)
    private readonly borrowRecordRepository: BorrowRecordRepository,
  ) {}

  async execute(
    memberCode: string,
    bookCode: string,
  ): Promise<BorrowResponseDTO> {
    // Find member
    const member = await this.memberRepository.findByCode(memberCode);
    if (!member) {
      throw new NotFoundException(`Member with code ${memberCode} not found`);
    }

    // Find book
    const book = await this.bookRepository.findByCode(bookCode);
    if (!book) {
      throw new NotFoundException(`Book with code ${bookCode} not found`);
    }

    // Check if member is penalized
    if (member.isPenalized()) {
      throw new BadRequestException(
        'Member is currently penalized and cannot borrow books',
      );
    }

    // Check if member has reached borrowing limit (max 2 books)
    if (member.borrowedBookIds.length >= 2) {
      throw new BadRequestException('Member cannot borrow more than 2 books');
    }

    // Check if book is available
    if (!book.isAvailable()) {
      throw new BadRequestException('Book is not available for borrowing');
    }

    // Check if member already borrowed this book
    if (member.borrowedBookIds.includes(book.id)) {
      throw new BadRequestException('Member has already borrowed this book');
    }

    // Create borrow record
    const record = new BorrowRecord({
      memberId: member.id,
      bookId: book.id,
      borrowDate: new Date(),
    });

    // Update member's borrowed books
    member.borrowBook(book.id);
    await this.memberRepository.update(member);

    // Update book's borrowed by members
    book.borrow(member.id);
    await this.bookRepository.update(book);

    // Save borrow record
    const data = await this.borrowRecordRepository.save(record);

    const response = new BorrowResponseDTO();
    response.borrow_date = data.borrowDate;
    response.code = book.code;
    response.title = book.title;

    return response;
  }
}
