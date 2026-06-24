import { ApiProperty } from '@nestjs/swagger';

export class ListMemberDTO {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ name: 'borrowed_book_count' })
  borrowedBooksCount: number;
  @ApiProperty({ name: 'is_penalized' })
  isPenalized: boolean;
  @ApiProperty({ name: 'penalty_until' })
  penaltyUntil: Date;
}
