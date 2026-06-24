import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookResponseDTO {
  @ApiProperty()
  borrow_date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  return_date: Date;
}
