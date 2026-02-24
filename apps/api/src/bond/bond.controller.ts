import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BondService } from './bond.service';
import { CalculateBondDto } from './dto/bond.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bond')
@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate bond yield metrics and cash flow schedule' })
  @ApiResponse({ status: 200, description: 'Calculation successful' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  calculate(@Body() dto: CalculateBondDto) {
    return this.bondService.calculate(dto);
  }
}
