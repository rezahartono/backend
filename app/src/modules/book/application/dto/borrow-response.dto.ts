import { ApiProperty } from '@nestjs/swagger';

export class BorrowResponseDTO {
  @ApiProperty()
  borrow_date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  code: string;
}
