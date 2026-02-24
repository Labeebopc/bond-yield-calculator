import { useState } from 'react';
import { type CalculateBondRequest, CouponFrequency } from '@bond-yield-calculator/shared';

interface Props {
  onCalculate: (data: CalculateBondRequest) => void;
  loading: boolean;
}

export function BondCalculatorForm({ onCalculate, loading }: Props) {
  const [formData, setFormData] = useState<CalculateBondRequest>({
    faceValue: 1000,
    annualCouponRate: 5,
    marketPrice: 950,
    yearsToMaturity: 5,
    frequency: CouponFrequency.SemiAnnual,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      faceValue: Number(formData.faceValue),
      annualCouponRate: Number(formData.annualCouponRate),
      marketPrice: Number(formData.marketPrice),
      yearsToMaturity: Number(formData.yearsToMaturity),
      frequency: Number(formData.frequency),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Face Value ($)</label>
          <input type="number" step="0.01" min="0.01" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={formData.faceValue} onChange={(e) => setFormData({...formData, faceValue: Number(e.target.value)})} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Annual Coupon Rate (%)</label>
          <input type="number" step="0.01" min="0" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={formData.annualCouponRate} onChange={(e) => setFormData({...formData, annualCouponRate: Number(e.target.value)})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Market Price ($)</label>
          <input type="number" step="0.01" min="0.01" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={formData.marketPrice} onChange={(e) => setFormData({...formData, marketPrice: Number(e.target.value)})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Years to Maturity</label>
          <input type="number" step="0.01" min="0.01" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={formData.yearsToMaturity} onChange={(e) => setFormData({...formData, yearsToMaturity: Number(e.target.value)})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Coupon Frequency</label>
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white" value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: Number(e.target.value)})}>
            <option value={CouponFrequency.Annual}>Annual (1x/yr)</option>
            <option value={CouponFrequency.SemiAnnual}>Semi-Annual (2x/yr)</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-70">
        {loading ? 'Calculating...' : 'Calculate Yields'}
      </button>
    </form>
  );
}
