import type { CashflowRow } from '@bond-yield-calculator/shared';

export function CashflowTable({ schedule }: { schedule: CashflowRow[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800">Cash Flow Schedule</h3>
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold sticky top-0 shadow-sm">
            <tr>
              <th className="px-6 py-4 bg-slate-50">Period</th>
              <th className="px-6 py-4 bg-slate-50">Date</th>
              <th className="px-6 py-4 text-right bg-slate-50">Coupon Payment</th>
              <th className="px-6 py-4 text-right bg-slate-50">Cumulative Interest</th>
              <th className="px-6 py-4 text-right bg-slate-50">Remaining Principal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {schedule.map((row) => (
              <tr key={row.period} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">{row.period}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.paymentDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                  +${row.couponPayment.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  ${row.cumulativeInterest.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-slate-900">
                  ${row.remainingPrincipal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
