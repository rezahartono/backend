import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check API')
@Controller('health')
export class HealthController {
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Response for Health Check',
  })
  healthCheck() {
    return 'Library API is Still Running!';
  }
}
