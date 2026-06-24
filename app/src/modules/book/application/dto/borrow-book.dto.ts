import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({
    name: 'member_code',
    example: 'M001',
    description: 'Member code',
  })
  @IsString()
  @IsNotEmpty()
  member_code: string;

  @ApiProperty({
    name: 'book_code',
    example: 'JK-45',
    description: 'Book code',
  })
  @IsString()
  @IsNotEmpty()
  book_code: string;
}
