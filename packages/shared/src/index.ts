export enum CouponFrequency {
  Annual = 1,
  SemiAnnual = 2,
}

export interface CalculateBondRequest {
  faceValue: number;
  annualCouponRate: number; // in percentage, e.g., 5 for 5%
  marketPrice: number;
  yearsToMaturity: number;
  frequency: CouponFrequency;
}

export interface CashflowRow {
  period: number;
  paymentDate: string; // ISO format or localized string
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface CalculateBondResponse {
  currentYield: number; // percentage
  yieldToMaturity: number; // percentage
  totalInterest: number;
  premiumDiscountIndicator: "Premium" | "Discount" | "At par";
  schedule: CashflowRow[];
}
