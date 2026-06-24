import { ApiProperty } from '@nestjs/swagger';

export class BorrowResponseDTO {
  @ApiProperty({ name: 'borrow_time' })
  borrowTime: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  code: string;
}
