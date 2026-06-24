import { ApiProperty } from '@nestjs/swagger';

export class ListBookDTO {
  @ApiProperty()
  code: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  available_stock: number;
}
