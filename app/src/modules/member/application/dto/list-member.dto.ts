import { ApiProperty } from '@nestjs/swagger';

export class ListMemberDTO {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  borrowed_books_count: number;
  @ApiProperty()
  is_penalized: boolean;
  @ApiProperty()
  penalty_until: Date | null;
}
