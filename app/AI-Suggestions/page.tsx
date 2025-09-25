"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { FaRobot, FaLightbulb, FaInfoCircle } from "react-icons/fa";

export default function AISuggestionsPage() {
  const [income, setIncome] = useState("");
  const [investment, setInvestment] = useState("");
  const [capitalGains, setCapitalGains] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [businessIncome, setBusinessIncome] = useState("");
  const [businessExpenses, setBusinessExpenses] = useState("");
  const [gstOutput, setGstOutput] = useState("");
  const [gstInput, setGstInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const response = await fetch("/api/ai-tax-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income,
          investment,
          capitalGains,
          otherIncome,
          businessIncome,
          businessExpenses,
          gstOutput,
          gstInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get suggestions");
      }

      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : [data.suggestions]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaRobot className="text-4xl text-primary" />
          <h1 className="text-4xl font-bold">AI-Powered Tax Suggestions</h1>
        </div>
        <p className="text-default-500 max-w-2xl mx-auto">
          Get personalized tax-saving suggestions based on your financial profile using our advanced AI system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="flex gap-3">
            <FaInfoCircle className="text-xl text-primary" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Financial Information</p>
              <p className="text-small text-default-500">Enter your financial details for personalized suggestions</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <Input
                type="number"
                label="Annual Income"
                placeholder="Enter your annual income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Current Investments"
                placeholder="Enter your current investments"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Capital Gains"
                placeholder="Enter your capital gains"
                value={capitalGains}
                onChange={(e) => setCapitalGains(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Other Income"
                placeholder="Enter other sources of income"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Business Income"
                placeholder="Enter your business income"
                value={businessIncome}
                onChange={(e) => setBusinessIncome(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Business Expenses"
                placeholder="Enter your business expenses"
                value={businessExpenses}
                onChange={(e) => setBusinessExpenses(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="GST Output"
                placeholder="Enter GST collected on sales"
                value={gstOutput}
                onChange={(e) => setGstOutput(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="GST Input"
                placeholder="Enter GST paid on purchases"
                value={gstInput}
                onChange={(e) => setGstInput(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₹</span>
                  </div>
                }
              />

              <Button
                color="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                isLoading={loading}
              >
                Get AI Suggestions
              </Button>

              {error && (
                <p className="text-danger text-center mt-2">{error}</p>
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardHeader className="flex gap-3">
            <FaLightbulb className="text-xl text-primary" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">AI Suggestions</p>
              <p className="text-small text-default-500">Personalized tax-saving recommendations</p>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Spinner size="lg" color="primary" />
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <FaLightbulb className="text-primary" />
                      </div>
                      <p>{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-default-500 py-8">
                Enter your financial details and click "Get AI Suggestions" to receive personalized recommendations
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-8 bg-primary-50">
        <CardHeader className="flex gap-3">
          <FaInfoCircle className="text-primary text-xl" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">How It Works</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-default-600">
              Our AI system analyzes your financial profile and provides personalized tax-saving suggestions based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Current income and investment patterns</li>
              <li>Available tax deductions and exemptions</li>
              <li>Business income and expenses</li>
              <li>GST implications and optimization opportunities</li>
            </ul>
            <p className="text-default-600">
              The suggestions are generated using advanced algorithms and are updated regularly to reflect the latest tax regulations.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
