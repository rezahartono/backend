import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CustomResponseDTO } from 'src/shared/application/dto/custom-response.dto';
import { ListBookDTO } from '../application/dto/list-book.dto';
import { BorrowResponseDTO } from '../application/dto/borrow-response.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books with available stock' })
  @ApiResponse({
    status: 200,
    description: 'List of all books',
    type: CustomResponseDTO<ListBookDTO[]>,
  })
  async showBooks() {}

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiResponse({
    status: 201,
    description: 'Book borrowed successfully',
    type: CustomResponseDTO<BorrowResponseDTO>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - business rule violation',
  })
  @ApiResponse({ status: 404, description: 'Member or book not found' })
  async borrowBook() {}

  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - book not borrowed by member',
  })
  @ApiResponse({ status: 404, description: 'Member or book not found' })
  async returnBook() {}
}
