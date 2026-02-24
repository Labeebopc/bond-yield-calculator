import { Test, TestingModule } from '@nestjs/testing';
import { BondService } from './bond.service';
import { CouponFrequency } from '@bond-yield-calculator/shared';

describe('BondService', () => {
  let service: BondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BondService],
    }).compile();

    service = module.get<BondService>(BondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate current yield correctly', () => {
    const result = service.calculate({
      faceValue: 1000,
      annualCouponRate: 5,
      frequency: CouponFrequency.Annual,
      marketPrice: 950,
      yearsToMaturity: 5,
    });
    // 50 / 950 * 100 = 5.263157...
    expect(result.currentYield).toBeCloseTo(5.263, 3);
  });

  it('should calculate YTM for a realistic bond with semi-annual payments', () => {
    // Face: 1000, Coupon: 5% (25 per period), Price: 950, Years: 5, SemiAnnual (10 periods)
    // Approximate YTM is 6.185%
    const result = service.calculate({
      faceValue: 1000,
      annualCouponRate: 5,
      frequency: CouponFrequency.SemiAnnual,
      marketPrice: 950,
      yearsToMaturity: 5,
    });
    expect(result.yieldToMaturity).toBeCloseTo(6.185, 2);
    expect(result.premiumDiscountIndicator).toBe('Discount');
    expect(result.totalInterest).toBe(250); // 10 * 25
  });

  it('should calculate exact YTM for a zero coupon bond', () => {
    // Face: 1000, Coupon: 0, Price: 800, Years: 5, Annual
    // YTM = (1000/800)^(1/5) - 1 = 0.04564 -> 4.564%
    const result = service.calculate({
      faceValue: 1000,
      annualCouponRate: 0,
      frequency: CouponFrequency.Annual,
      marketPrice: 800,
      yearsToMaturity: 5,
    });
    expect(result.yieldToMaturity).toBeCloseTo(4.564, 3);
    expect(result.premiumDiscountIndicator).toBe('Discount');
  });

  it('should generate correct schedule length and final principal', () => {
    const result = service.calculate({
      faceValue: 1000,
      annualCouponRate: 5,
      frequency: CouponFrequency.SemiAnnual,
      marketPrice: 1000,
      yearsToMaturity: 2.5,
    });
    
    // 2.5 years * 2 = 5 periods
    expect(result.schedule.length).toBe(5);
    expect(result.schedule[4].remainingPrincipal).toBe(0);
    expect(result.schedule[3].remainingPrincipal).toBe(1000); // Before final payment
    expect(result.schedule[0].period).toBe(1);
    expect(result.schedule[4].period).toBe(5);
  });
});
