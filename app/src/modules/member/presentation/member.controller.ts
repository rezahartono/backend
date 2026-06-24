import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { ListMemberDTO } from '../application/dto/list-member.dto';
import { CustomResponseDTO } from 'src/shared/application/dto/custom-response.dto';
import type { Request } from 'express';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: 'Get all members with borrowed members count' })
  @ApiResponse({
    status: 200,
    description: 'List of all members',
    type: CustomResponseDTO<ListMemberDTO[]>,
  })
  async showMembers(@Req() request: Request) {
    const members = await this.memberService.showMembers();

    const response = new CustomResponseDTO<ListMemberDTO[]>();
    response.data = members;
    response.message = 'Fetch list of members success!';
    response.path = request.path;
    response.success = true;

    return response;
  }
}
