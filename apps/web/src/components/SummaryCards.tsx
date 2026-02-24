import type { CalculateBondResponse } from '@bond-yield-calculator/shared';
import { TrendingUp, DollarSign, Activity, Tag } from 'lucide-react';

export function SummaryCards({ result }: { result: CalculateBondResponse }) {
  const cards = [
    {
      title: 'Yield to Maturity',
      value: `${result.yieldToMaturity.toFixed(4)}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      title: 'Current Yield',
      value: `${result.currentYield.toFixed(4)}%`,
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Total Interest Earned',
      value: `$${result.totalInterest.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      title: 'Pricing Status',
      value: result.premiumDiscountIndicator,
      icon: Tag,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">{c.title}</h3>
            <div className={`p-2 rounded-lg ${c.bg}`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
