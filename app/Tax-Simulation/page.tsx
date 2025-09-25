"use client";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import dynamic from "next/dynamic";
import { FaCalculator, FaChartBar, FaInfoCircle } from "react-icons/fa";

const TaxChart = dynamic(() => import("./TaxChart"), { ssr: false });

export default function TaxSimulationPage() {
  const [income, setIncome] = useState<string>("");
  const [taxRegime, setTaxRegime] = useState("old");
  const [deductions, setDeductions] = useState({
    section80C: "",
    section80D: "",
    section80E: "",
    homeLoan: "",
    others: "",
  });
  const [tax, setTax] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setIncome(value);
    }
  };

  const handleDeductionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value)) || value === "") {
      setDeductions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateTax = () => {
    setLoading(true);
    setError("");
    setBreakdown([]);
    setSuggestions([]);
    const annualIncome = parseFloat(income);

    const parsedDeductions = {
      section80C: parseFloat(deductions.section80C) || 0,
      section80D: parseFloat(deductions.section80D) || 0,
      section80E: parseFloat(deductions.section80E) || 0,
      homeLoan: parseFloat(deductions.homeLoan) || 0,
      others: parseFloat(deductions.others) || 0,
    };

    if (isNaN(annualIncome) || annualIncome <= 0) {
      setError("Please enter a valid income.");
      setTax(null);
      setLoading(false);
      return;
    }

    let taxableIncome = annualIncome;
    let totalDeductions = 0;

    // Apply deductions in old regime
    if (taxRegime === "old") {
      totalDeductions =
        Math.min(parsedDeductions.section80C, 150000) +
        Math.min(parsedDeductions.section80D, 25000) +
        Math.min(parsedDeductions.section80E, 50000) +
        parsedDeductions.homeLoan +
        parsedDeductions.others;

      taxableIncome -= totalDeductions;
    }

    // Define tax slabs
    const slabs =
      taxRegime === "old"
        ? [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.2 },
            { limit: Infinity, rate: 0.3 },
          ]
        : [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.1 },
            { limit: Infinity, rate: 0.2 },
          ];

    let prevLimit = 0;
    let totalTax = 0;
    const taxDetails: string[] = [];

    slabs.forEach((slab) => {
      if (taxableIncome > prevLimit) {
        const taxableForSlab = Math.min(taxableIncome, slab.limit) - prevLimit;
        const slabTax = taxableForSlab * slab.rate;
        totalTax += slabTax;

        if (slab.rate > 0) {
          taxDetails.push(
            `₹${taxableForSlab.toFixed(2)} taxed at ${slab.rate * 100}% = ₹${slabTax.toFixed(2)}`,
          );
        }

        prevLimit = slab.limit;
      }
    });

    setTax(totalTax);
    setBreakdown(taxDetails);

    // Tax-saving suggestions
    const potentialSavings: string[] = [];
    if (parsedDeductions.section80C < 150000) {
      potentialSavings.push(
        "Consider investing more under Section 80C to maximize tax savings.",
      );
    }
    if (parsedDeductions.section80D < 25000) {
      potentialSavings.push(
        "Increase health insurance premium to claim full deduction under Section 80D.",
      );
    }

    setSuggestions(potentialSavings);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Advanced Tax Simulation</h1>
        <p className="text-default-500 max-w-2xl mx-auto">
          Calculate your tax liability and get a detailed breakdown of your tax
          components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardBody>
            <div className="flex items-center gap-2 mb-6">
              <FaCalculator className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Input Details</h2>
            </div>

            <div className="space-y-6">
              <Input
                type="number"
                label="Annual Income"
                placeholder="Enter your annual income"
                value={income}
                onChange={handleIncomeChange}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <FaInfoCircle className="text-default-400" />
                  </div>
                }
              />

              <div className="mb-4">
                <label
                  htmlFor="taxRegime"
                  className="block text-sm font-medium mb-1"
                >
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

              {taxRegime === "old" && (
                <>
                  <Input
                    type="number"
                    label="Section 80C Deductions"
                    placeholder="Enter your Section 80C deductions"
                    value={deductions.section80C}
                    onChange={handleDeductionsChange}
                    name="section80C"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <FaInfoCircle className="text-default-400" />
                      </div>
                    }
                  />

                  <Input
                    type="number"
                    label="Section 80D Deductions"
                    placeholder="Enter your Section 80D deductions"
                    value={deductions.section80D}
                    onChange={handleDeductionsChange}
                    name="section80D"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <FaInfoCircle className="text-default-400" />
                      </div>
                    }
                  />

                  <Input
                    type="number"
                    label="Section 80E Deductions"
                    placeholder="Enter your Section 80E deductions"
                    value={deductions.section80E}
                    onChange={handleDeductionsChange}
                    name="section80E"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <FaInfoCircle className="text-default-400" />
                      </div>
                    }
                  />

                  <Input
                    type="number"
                    label="Home Loan Interest"
                    placeholder="Enter your home loan interest"
                    value={deductions.homeLoan}
                    onChange={handleDeductionsChange}
                    name="homeLoan"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <FaInfoCircle className="text-default-400" />
                      </div>
                    }
                  />
                </>
              )}

              {error && <p className="text-red-500 mt-2">{error}</p>}

              <Button
                color="primary"
                size="lg"
                className="w-full"
                onClick={calculateTax}
                isLoading={loading}
              >
                Calculate Tax
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardBody>
            <div className="flex items-center gap-2 mb-6">
              <FaChartBar className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Tax Breakdown</h2>
            </div>

            {tax !== null ? (
              <div className="space-y-4">
                {breakdown.map((step, index) => (
                  <div key={index} className="p-3 bg-default-100 rounded-lg">
                    {step}
                  </div>
                ))}

                <Divider className="my-4" />

                <div className="text-center">
                  <p className="text-sm text-default-500 mb-2">
                    Total Tax Liability
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{tax.toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-default-500 py-8">
                Enter your income and calculate to see the tax breakdown
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {tax !== null && (
        <Card className="mt-8 p-6">
          <CardBody>
            <div className="flex items-center gap-2 mb-6">
              <FaChartBar className="text-2xl text-primary" />
              <h2 className="text-xl font-semibold">Visualization</h2>
            </div>
            <TaxChart breakdown={breakdown} />
          </CardBody>
        </Card>
      )}

      {tax !== null && (
        <Card className="mt-8 p-6">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">
              Suggestions to Save Tax
            </h3>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              {suggestions.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Card className="mt-8 p-6 bg-primary-50">
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-default-600">
            <li>
              This is a simplified tax calculator for illustration purposes
            </li>
            <li>
              Actual tax calculations may vary based on various deductions and
              exemptions
            </li>
            <li>Consult a tax professional for accurate tax planning</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
