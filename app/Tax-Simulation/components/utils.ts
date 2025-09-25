/* eslint-disable prettier/prettier */
export function calculateTax(
  income: string,
  taxRegime: string,
  deductions: { section80C: string; section80D: string },
) {
  let taxableIncome = parseFloat(income);
  const deduction80C = parseFloat(deductions.section80C) || 0;
  const deduction80D = parseFloat(deductions.section80D) || 0;

  // Apply deductions if old tax regime is selected
  if (taxRegime === "old") {
    taxableIncome -= Math.min(deduction80C, 150000);
    taxableIncome -= Math.min(deduction80D, 25000);
  }

  // Define tax slabs based on selected tax regime
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

  let taxAmount = 0;
  let prevLimit = 0;
  const breakdown: { label: string; value: string }[] = [];

  // Calculate tax based on slabs
  slabs.forEach((slab) => {
    if (taxableIncome > prevLimit) {
      const taxableForSlab = Math.min(taxableIncome, slab.limit) - prevLimit;
      const slabTax = taxableForSlab * slab.rate;
      taxAmount += slabTax;

      // Store breakdown in label and value format for better flexibility
      breakdown.push({
        label: `₹${taxableForSlab.toFixed(2)} taxed at ${slab.rate * 100}%`,
        value: `= ₹${slabTax.toFixed(2)}`,
      });
    }
    prevLimit = slab.limit;
  });

  return { amount: taxAmount, breakdown };
}
