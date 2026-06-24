import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { MEMBER_REPOSITORY } from '../../../member/domain/repositories/member.repository';
import { BOOK_REPOSITORY } from '../../domain/repositories/book.repository';
import { BORROW_RECORD_REPOSITORY } from '../../domain/repositories/borrow-record.repository';
import type { MemberRepository } from '../../../member/domain/repositories/member.repository';
import type { BookRepository } from '../../domain/repositories/book.repository';
import type { BorrowRecordRepository } from '../../domain/repositories/borrow-record.repository';
import { ReturnBookResponseDTO } from '../dto/return-book-response';

@Injectable()
export class ReturnBookUseCase {
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
  ): Promise<ReturnBookResponseDTO> {
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

    // Check if member has borrowed this book
    if (!member.borrowedBookIds.includes(book.id)) {
      throw new BadRequestException('Member has not borrowed this book');
    }

    // Find active borrow record
    const activeRecords =
      await this.borrowRecordRepository.findActiveByMemberId(member.id);
    const record = activeRecords.find((r) => r.bookId === book.id);

    if (!record) {
      throw new BadRequestException('No active borrow record found');
    }

    // Update return date
    record.returnDate = new Date();

    // Check if returned after 7 days (late return)
    if (record.isLateReturn()) {
      // Apply 3-day penalty
      member.applyPenalty(3);
      await this.memberRepository.update(member);
    }

    // Update member's borrowed books
    member.returnBook(book.id);
    await this.memberRepository.update(member);

    // Update book's borrowed by members
    book.return(member.id);
    await this.bookRepository.update(book);

    // Save updated record
    const response = new ReturnBookResponseDTO();
    response.borrow_date = record.borrowDate;
    response.code = book.code;
    response.title = book.title;
    response.return_date = record.returnDate;

    return response;
  }
}
