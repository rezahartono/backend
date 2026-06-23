import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseDTO<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T | T[];
}
