"use client";

import React, { useState } from "react";

const AdvancedTaxCalculator = () => {
  // State hooks for inputs
  const [userType, setUserType] = useState<"businessman" | "industrialist">(
    "businessman",
  );
  const [income, setIncome] = useState<number>(0);
  const [businessIncome, setBusinessIncome] = useState<number>(0);
  const [capitalGains, setCapitalGains] = useState<number>(0);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [businessExpenses, setBusinessExpenses] = useState<number>(0);
  const [gstOutput, setGstOutput] = useState<number>(0);
  const [gstInputTax, setGstInputTax] = useState<number>(0);
  const [investment, setInvestment] = useState<number>(0);
  const [calculatedTax, setCalculatedTax] = useState<string>("");

  // Tax slabs and constants for old and new regimes
  const oldRegimeSlabs = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 5 },
    { limit: 1000000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ];

  const newRegimeSlabs = [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 5 },
    { limit: 900000, rate: 10 },
    { limit: 1200000, rate: 15 },
    { limit: 1500000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ];

  const surchargeRates = [
    { threshold: 5000000, rate: 10 },
    { threshold: 10000000, rate: 15 },
    { threshold: 20000000, rate: 25 },
    { threshold: Infinity, rate: 37 },
  ];

  const rebateThreshold = 500000;

  // Function to calculate tax for income
  const calculateIncomeTax = (
    netIncome: number,
    slabs: typeof oldRegimeSlabs,
  ) => {
    let remainingIncome = netIncome;
    let tax = 0;
    slabs.forEach((slab, index) => {
      const prevLimit = index === 0 ? 0 : slabs[index - 1].limit;
      const taxableAmount = Math.min(remainingIncome, slab.limit - prevLimit);

      if (taxableAmount > 0) {
        tax += (taxableAmount * slab.rate) / 100;
        remainingIncome -= taxableAmount;
      }
    });
    return tax;
  };

  // Function to calculate GST Payable
  const calculateGSTPayable = (output: number, inputTax: number) =>
    Math.max(0, output - inputTax);

  // Function to calculate rebate under Section 87A
  const calculateRebate = (netIncome: number, tax: number) => {
    if (netIncome <= rebateThreshold) {
      return tax > 0 ? Math.min(tax, 2500) : 0;
    }
    return 0;
  };

  // Function to calculate surcharge
  const calculateSurcharge = (income: number, baseTax: number) => {
    const applicableSurcharge = surchargeRates.find(
      (rate) => income > rate.threshold,
    ) || { rate: 0 };
    return (baseTax * applicableSurcharge.rate) / 100;
  };

  // Main calculation handler for both businessman and industrialist
  const handleCalculate = () => {
    let totalIncome = 0;
    let netIncome = 0;

    if (userType === "businessman") {
      // Businessman income and expenses calculation
      totalIncome = businessIncome + capitalGains + otherIncome;
      netIncome = totalIncome - businessExpenses;
    } else {
      // Industrialist income and investment calculation
      totalIncome = income + capitalGains + otherIncome;
      netIncome = totalIncome - investment;
    }

    // Select tax slabs based on regime
    const slabs = newRegimeSlabs; // assuming new regime for simplicity

    // Calculate tax, rebate, and surcharge
    const baseTax = calculateIncomeTax(netIncome, slabs);
    const rebate = calculateRebate(netIncome, baseTax);
    const surcharge = calculateSurcharge(netIncome, baseTax);

    // Calculate GST payable
    const gstPayable = calculateGSTPayable(gstOutput, gstInputTax);

    // Calculate final tax payable
    const totalTax = baseTax + surcharge - rebate + gstPayable;
    setCalculatedTax(`
      Total Income: ₹${totalIncome.toFixed(2)},
      Expenses/Investments: ₹${userType === "businessman" ? businessExpenses : investment},
      Income Tax: ₹${baseTax.toFixed(2)},
      Rebate (Section 87A): ₹${rebate.toFixed(2)},
      Surcharge: ₹${surcharge.toFixed(2)},
      GST Payable: ₹${gstPayable.toFixed(2)},
      Total Tax Payable: ₹${totalTax.toFixed(2)}
    `);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-800 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Advanced Tax Calculator for Businessmen and Industrialists
      </h1>

      {/* Toggle User Type */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setUserType("businessman")}
          className={`px-6 py-3 mx-4 rounded-md text-lg ${userType === "businessman" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Businessman
        </button>
        <button
          onClick={() => setUserType("industrialist")}
          className={`px-6 py-3 mx-4 rounded-md text-lg ${userType === "industrialist" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Industrialist
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-gray-900 shadow-lg rounded-lg p-6">
          {/* Income & Expenses/Investments */}
          {userType === "businessman" ? (
            <>
              {/* Business Income */}
              <div className="mb-4">
                <label htmlFor="businessIncome" className="block text-sm font-medium mb-1">
                  Business Income (₹):
                </label>
                <input
                  id="businessIncome"
                  type="number"
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border rounded-md"
                  value={businessIncome}
                  onChange={(e) =>
                    setBusinessIncome(parseFloat(e.target.value))
                  }
                />
              </div>

              {/* Business Expenses */}
              <div className="mb-4">
                <label htmlFor="businessExpenses" className="block text-sm font-medium mb-1">
                  Business Expenses (₹):
                </label>
                <input
                  id="businessExpenses"
                  type="number"
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border rounded-md"
                  value={businessExpenses}
                  onChange={(e) =>
                    setBusinessExpenses(parseFloat(e.target.value))
                  }
                />
              </div>
            </>
          ) : (
            <>
              {/* Income */}
              <div className="mb-4">
                <label htmlFor="income" className="block text-sm font-medium mb-1">
                  Income (₹):
                </label>
                <input
                  id="income"
                  type="number"
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border rounded-md"
                  value={income}
                  onChange={(e) => setIncome(parseFloat(e.target.value))}
                />
              </div>

              {/* Investment */}
              <div className="mb-4">
                <label htmlFor="investment" className="block text-sm font-medium mb-1">
                  Investment (₹):
                </label>
                <input
                  id="investment"
                  type="number"
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border rounded-md"
                  value={investment}
                  onChange={(e) => setInvestment(parseFloat(e.target.value))}
                />
              </div>
            </>
          )}

          {/* Capital Gains */}
          <div className="mb-4">
            <label htmlFor="capitalGains" className="block text-sm font-medium mb-1">
              Capital Gains (₹):
            </label>
            <input
              id="capitalGains"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={capitalGains}
              onChange={(e) => setCapitalGains(parseFloat(e.target.value))}
            />
          </div>

          {/* Other Income */}
          <div className="mb-4">
            <label htmlFor="otherIncome" className="block text-sm font-medium mb-1">
              Other Income (₹):
            </label>
            <input
              id="otherIncome"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={otherIncome}
              onChange={(e) => setOtherIncome(parseFloat(e.target.value))}
            />
          </div>

          {/* GST Output */}
          <div className="mb-4">
            <label htmlFor="gstOutput" className="block text-sm font-medium mb-1">
              GST Output (₹):
            </label>
            <input
              id="gstOutput"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={gstOutput}
              onChange={(e) => setGstOutput(parseFloat(e.target.value))}
            />
          </div>

          {/* GST Input Tax Credit */}
          <div className="mb-4">
            <label htmlFor="gstInputTax" className="block text-sm font-medium mb-1">
              GST Input Tax Credit (₹):
            </label>
            <input
              id="gstInputTax"
              type="number"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border rounded-md"
              value={gstInputTax}
              onChange={(e) => setGstInputTax(parseFloat(e.target.value))}
            />
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCalculate}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Calculate Tax
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-900 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Tax Calculation Results:
          </h3>
          <pre className="text-sm">{calculatedTax}</pre>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTaxCalculator;
