/* eslint-disable prettier/prettier */
"use client";
interface TaxResultProps {
  taxResult: {
    amount: number;
    breakdown: {
      label: string;
      value: string;
    }[];
  };
}

export default function TaxResult({ taxResult }: TaxResultProps) {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Tax Calculation Result</h2>
      <p className="text-lg mt-2">
        <span className="font-semibold">Total Tax Payable: </span>₹
        {taxResult.amount.toFixed(2)}
      </p>

      <h3 className="text-xl font-semibold mt-4">Breakdown:</h3>
      <ul className="list-disc pl-6 mt-2">
        {taxResult.breakdown.map((item, index) => (
          <li key={index} className="text-lg">
            <span className="font-semibold">{item.label}: </span>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
