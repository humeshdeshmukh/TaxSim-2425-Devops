"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { FaBook, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

interface TaxRule {
  title: string;
  description: string;
  category: string;
}

export default function TaxRulesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taxRules, setTaxRules] = useState<TaxRule[]>([]);

  useEffect(() => {
    const fetchTaxRules = async () => {
      try {
        // Simulated API call
        const rules: TaxRule[] = [
          {
            title: "Standard Deduction",
            description:
              "A flat deduction of ₹50,000 is available to all salaried individuals under both old and new tax regimes.",
            category: "Deductions",
          },
          {
            title: "Section 80C Investments",
            description:
              "Deduction up to ₹1.5 lakh available for investments in PPF, ELSS, Life Insurance Premium, etc.",
            category: "Deductions",
          },
          {
            title: "House Rent Allowance (HRA)",
            description:
              "Tax exemption on HRA received from employer, subject to certain conditions and limits.",
            category: "Exemptions",
          },
          {
            title: "New Tax Regime Slabs",
            description:
              "Income up to ₹3 lakh: No tax\n₹3-6 lakh: 5%\n₹6-9 lakh: 10%\n₹9-12 lakh: 15%\n₹12-15 lakh: 20%\nAbove ₹15 lakh: 30%",
            category: "Tax Slabs",
          },
          {
            title: "Old Tax Regime Slabs",
            description:
              "Income up to ₹2.5 lakh: No tax\n₹2.5-5 lakh: 5%\n₹5-10 lakh: 20%\nAbove ₹10 lakh: 30%",
            category: "Tax Slabs",
          },
          {
            title: "Section 80D",
            description:
              "Deduction for medical insurance premium up to ₹25,000 for self and family, additional ₹25,000 for parents.",
            category: "Deductions",
          },
        ];
        setTaxRules(rules);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tax rules");
        setLoading(false);
      }
    };

    fetchTaxRules();
  }, []);

  const categories = ["All", "Deductions", "Exemptions", "Tax Slabs"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRules = taxRules.filter((rule) =>
    selectedCategory === "All" ? true : rule.category === selectedCategory,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger p-4">
        <FaInfoCircle className="text-4xl mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaBook className="text-4xl text-primary" />
          <h1 className="text-4xl font-bold">Tax Rules and Guidelines</h1>
        </div>
        <p className="text-default-500 max-w-2xl mx-auto">
          Understanding tax rules is crucial for effective tax planning. Here's
          a comprehensive guide to help you navigate through various tax
          provisions.
        </p>
      </div>

      <Card className="mb-8">
        <CardBody>
          <Tabs
            aria-label="Tax Categories"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key as string)}
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                title={
                  <div className="flex items-center space-x-2">
                    <span>{category}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Accordion variant="bordered">
          {filteredRules.map((rule, index) => (
            <AccordionItem
              key={index}
              aria-label={rule.title}
              title={
                <div className="flex items-center gap-2">
                  <FaQuestionCircle className="text-primary" />
                  <span className="font-semibold">{rule.title}</span>
                  <span className="ml-auto text-small text-default-400">
                    {rule.category}
                  </span>
                </div>
              }
            >
              <div className="px-2 py-4">
                {rule.description.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card className="mt-8 bg-primary-50">
        <CardHeader className="flex gap-3">
          <FaInfoCircle className="text-primary text-xl" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Important Note</p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-default-600">
            Tax rules and regulations are subject to change. The information
            provided here is for general guidance only. Please consult with a
            tax professional for advice specific to your situation.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
