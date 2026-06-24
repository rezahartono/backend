import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CustomResponseDTO } from 'src/shared/application/dto/custom-response.dto';
import { ListBookDTO } from '../application/dto/list-book.dto';
import { BorrowResponseDTO } from '../application/dto/borrow-response.dto';
import type { Request } from 'express';
import { BorrowBookDto } from '../application/dto/borrow-book.dto';
import { ReturnBookDto } from '../application/dto/return-book.dto';

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
  async showBooks(@Req() request: Request) {
    const books = await this.bookService.showBooks();

    const response = new CustomResponseDTO<ListBookDTO[]>();
    response.data = books;
    response.message = 'Fetch list of books success!';
    response.path = request.path;
    response.success = true;

    return response;
  }

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
  async borrowBook(@Req() request: Request, @Body() payload: BorrowBookDto) {
    console.log(payload);

    const data = await this.bookService.borrowBook(payload);

    const response = new CustomResponseDTO<BorrowResponseDTO>();
    response.data = data;
    response.message = 'Borrow book success!';
    response.path = request.path;
    response.success = true;

    return response;
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - book not borrowed by member',
  })
  @ApiResponse({ status: 404, description: 'Member or book not found' })
  async returnBook(@Req() request: Request, @Body() payload: ReturnBookDto) {
    const data = await this.bookService.returnBook(payload);

    const response = new CustomResponseDTO<BorrowResponseDTO>();
    response.data = data;
    response.message = 'Return book success!';
    response.path = request.path;
    response.success = true;

    return response;
  }
}
