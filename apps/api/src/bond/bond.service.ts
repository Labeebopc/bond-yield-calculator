import { Injectable, BadRequestException } from '@nestjs/common';
import { CalculateBondDto } from './dto/bond.dto';
import { CalculateBondResponse, CashflowRow } from '@bond-yield-calculator/shared';

@Injectable()
export class BondService {
  calculate(dto: CalculateBondDto): CalculateBondResponse {
    const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, frequency } = dto;

    const couponPerPeriod = (faceValue * (annualCouponRate / 100)) / frequency;
    const nPeriods = Math.round(yearsToMaturity * frequency);

    if (nPeriods <= 0) {
      throw new BadRequestException('Years to maturity and frequency must result in at least 1 period');
    }

    const currentYield = marketPrice > 0 ? ((faceValue * (annualCouponRate / 100)) / marketPrice) * 100 : 0;

    let premiumDiscountIndicator: 'Premium' | 'Discount' | 'At par' = 'At par';
    if (marketPrice > faceValue) premiumDiscountIndicator = 'Premium';
    else if (marketPrice < faceValue) premiumDiscountIndicator = 'Discount';

    const totalInterest = couponPerPeriod * nPeriods;

    // YTM Calculation using Newton-Raphson
    const ytmDecimal = this.calculateYTM(faceValue, marketPrice, couponPerPeriod, nPeriods);
    const ytmAnnual = ytmDecimal * frequency * 100; // to percentage

    // Build Cashflow Schedule
    const schedule: CashflowRow[] = [];
    let cumulativeInterest = 0;
    
    // For simplicity, we assume date starts from today, adding periods
    const baseDate = new Date();
    // Assuming flat 12 months for simpler date logic
    const monthsPerPeriod = 12 / frequency;

    for (let period = 1; period <= nPeriods; period++) {
      cumulativeInterest += couponPerPeriod;
      
      const paymentDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + period * monthsPerPeriod, baseDate.getDate());

      const remainingPrincipal = period === nPeriods ? 0 : faceValue;

      schedule.push({
        period,
        paymentDate: paymentDate.toISOString().split('T')[0],
        couponPayment: couponPerPeriod,
        cumulativeInterest,
        remainingPrincipal,
      });
    }

    return {
      currentYield,
      yieldToMaturity: ytmAnnual,
      totalInterest,
      premiumDiscountIndicator,
      schedule,
    };
  }

  private calculateYTM(faceValue: number, marketPrice: number, couponPerPeriod: number, nPeriods: number): number {
    if (couponPerPeriod === 0) {
      return Math.pow(faceValue / marketPrice, 1 / nPeriods) - 1;
    }

    let y = (couponPerPeriod / marketPrice);
    if (y === 0) y = 0.05;

    const maxIterations = 100;
    const tol = 1e-8;

    for (let i = 0; i < maxIterations; i++) {
        let fNode = 0;
        let dfNode = 0;

        for (let t = 1; t <= nPeriods; t++) {
            const denom = Math.pow(1 + y, t);
            fNode += couponPerPeriod / denom;
            dfNode -= (t * couponPerPeriod) / Math.pow(1 + y, t + 1);
        }

        fNode += faceValue / Math.pow(1 + y, nPeriods) - marketPrice;
        dfNode -= (nPeriods * faceValue) / Math.pow(1 + y, nPeriods + 1);

        if (Math.abs(dfNode) < Number.EPSILON) {
           break;
        }
        
        const yNew = y - fNode / dfNode;

        if (Math.abs(yNew - y) < tol) {
            return yNew;
        }
        y = yNew;
    }

    return y;
  }
}
