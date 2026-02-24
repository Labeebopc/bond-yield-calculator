import { IsNumber, IsPositive, Min, IsEnum } from 'class-validator';
import { CalculateBondRequest, CouponFrequency } from '@bond-yield-calculator/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateBondDto implements CalculateBondRequest {
  @ApiProperty({ description: 'Face value of the bond', example: 1000 })
  @IsNumber()
  @IsPositive()
  faceValue: number;

  @ApiProperty({ description: 'Annual coupon rate as a percentage', example: 5 })
  @IsNumber()
  @Min(0)
  annualCouponRate: number;

  @ApiProperty({ description: 'Current market price', example: 950 })
  @IsNumber()
  @IsPositive()
  marketPrice: number;

  @ApiProperty({ description: 'Years to maturity (allow decimals)', example: 5.5 })
  @IsNumber()
  @IsPositive()
  yearsToMaturity: number;

  @ApiProperty({ enum: CouponFrequency, description: 'Coupon payment frequency', example: 2 })
  @IsEnum(CouponFrequency)
  frequency: CouponFrequency;
}
