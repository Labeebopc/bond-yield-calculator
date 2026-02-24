import { useState } from 'react';
import { BondCalculatorForm } from './components/BondCalculatorForm';
import { SummaryCards } from './components/SummaryCards';
import { CashflowTable } from './components/CashflowTable';
import type { CalculateBondResponse, CalculateBondRequest } from '@bond-yield-calculator/shared';
import { Calculator } from 'lucide-react';

// Use env variable or fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [result, setResult] = useState<CalculateBondResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (data: CalculateBondRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/bond/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate bond yield. Please check your inputs.');
      }

      const json = await response.json();
      setResult(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4 shadow-md shadow-blue-500/20">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bond Yield Calculator</h1>
          <p className="mt-2 text-lg text-slate-500 font-medium">Analyze bond yields, cash flows, and pricing instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 border-t-4 border-blue-600 rounded-2xl bg-white shadow-sm overflow-hidden pt-1">
            <BondCalculatorForm onCalculate={handleCalculate} loading={loading} />
            {error && <div className="m-4 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">{error}</div>}
          </div>

          <div className="lg:col-span-2 space-y-8">
            {result ? (
              <>
                <SummaryCards result={result} />
                <CashflowTable schedule={result.schedule} />
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 flex flex-col items-center justify-center text-center text-slate-500 h-[calc(100%-2rem)]">
                <Calculator className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Data to Display</h3>
                <p>Enter the bond details in the form and click calculate to see the analysis.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
