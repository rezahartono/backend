import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { ListMemberDTO } from '../application/dto/list-member.dto';
import { CustomResponseDTO } from 'src/shared/application/dto/custom-response.dto';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: 'Get all members with borrowed books count' })
  @ApiResponse({
    status: 200,
    description: 'List of all members',
    type: CustomResponseDTO<ListMemberDTO[]>,
  })
  async showBooks() {}
}
