import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookResponseDTO {
  @ApiProperty({ name: 'borrow_time' })
  borrowTime: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  code: string;
}
