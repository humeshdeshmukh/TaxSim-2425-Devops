/* eslint-disable prettier/prettier */
"use client";
import React from "react";

interface TaxInputFormProps {
  income: string;
  setIncome: React.Dispatch<React.SetStateAction<string>>;
  taxRegime: string;
  setTaxRegime: React.Dispatch<React.SetStateAction<string>>;
  deductions: {
    section80C: string;
    section80D: string;
    section80E: string;
    homeLoan: string;
    others: string;
  };
  setDeductions: React.Dispatch<
    React.SetStateAction<{
      section80C: string;
      section80D: string;
      section80E: string;
      homeLoan: string;
      others: string;
    }>
  >;
  onSubmit: () => void;
}

export default function TaxInputForm({
  income,
  setIncome,
  taxRegime,
  setTaxRegime,
  deductions,
  setDeductions,
  onSubmit,
}: TaxInputFormProps) {
  return (
    <div className="space-y-8">
      {/* Income Section */}
      <div className="mb-4">
        <label htmlFor="income" className="block text-sm font-medium mb-1">
          Annual Income (₹):
        </label>
        <input
          id="income"
          type="number"
          min="0"
          step="1000"
          className="w-full px-3 py-2 border rounded-md"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value).toString())}
        />
      </div>

      {/* Tax Regime Selection */}
      <div className="mb-4">
        <label htmlFor="taxRegime" className="block text-sm font-medium mb-1">
          Tax Regime:
        </label>
        <select
          id="taxRegime"
          value={taxRegime}
          onChange={(e) => setTaxRegime(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="old">Old Regime (with deductions)</option>
          <option value="new">New Regime (without deductions)</option>
        </select>
      </div>

      {/* Section for Old Regime Deductions */}
      {taxRegime === "old" && (
        <>
          <div className="mb-4">
            <label
              htmlFor="section80C"
              className="block text-sm font-medium mb-1"
            >
              Section 80C Deductions (₹):
            </label>
            <input
              id="section80C"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={deductions.section80C}
              onChange={(e) =>
                setDeductions((prev) => ({
                  ...prev,
                  section80C: parseFloat(e.target.value).toString(),
                }))
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="section80D"
              className="block text-sm font-medium mb-1"
            >
              Section 80D Deductions (₹):
            </label>
            <input
              id="section80D"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={deductions.section80D}
              onChange={(e) =>
                setDeductions((prev) => ({
                  ...prev,
                  section80D: parseFloat(e.target.value).toString(),
                }))
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="section80E"
              className="block text-sm font-medium mb-1"
            >
              Section 80E Deductions (₹):
            </label>
            <input
              id="section80E"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={deductions.section80E}
              onChange={(e) =>
                setDeductions((prev) => ({
                  ...prev,
                  section80E: parseFloat(e.target.value).toString(),
                }))
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="homeLoan"
              className="block text-sm font-medium mb-1"
            >
              Home Loan Interest Deductions (₹):
            </label>
            <input
              id="homeLoan"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={deductions.homeLoan}
              onChange={(e) =>
                setDeductions((prev) => ({
                  ...prev,
                  homeLoan: parseFloat(e.target.value).toString(),
                }))
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="others" className="block text-sm font-medium mb-1">
              Other Deductions (₹):
            </label>
            <input
              id="others"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={deductions.others}
              onChange={(e) =>
                setDeductions((prev) => ({
                  ...prev,
                  others: parseFloat(e.target.value).toString(),
                }))
              }
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
      >
        Calculate Tax
      </button>
    </div>
  );
}
