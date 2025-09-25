/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      income,
      age,
      investments,
      homeLoanInterest,
      insurancePremiums,
      medicalExpenses,
      capitalGains,
      retirementSavings,
      charitableDonations,
      otherExpenses,
      rentPayments,
      children,
    } = req.body;

    let suggestions = `Based on your income of ₹${income}, here are advanced strategies to minimize your tax liability:\n`;

    // Tax-saving suggestions based on income slab
    if (income <= 250000) {
      suggestions += "1. Your income falls within the exempt category. No tax is payable.\n";
    } else if (income <= 500000) {
      suggestions += "1. You can avail of the rebate under Section 87A to reduce your tax liability.\n";
    } else if (income <= 1000000) {
      suggestions += `1. Consider investing in tax-saving instruments under Section 80C (₹1.5 lakh limit), such as:\n   - Public Provident Fund (PPF)\n   - Equity-Linked Savings Scheme (ELSS)\n   - National Savings Certificate (NSC)\n`;
      if (insurancePremiums) {
        suggestions += `   - Enhance your health insurance premiums to claim deductions under Section 80D (up to ₹50,000 for senior citizens).\n`;
      }
    } else {
      suggestions += `1. You are in the highest tax slab. Maximize deductions under various sections, including:\n   - Section 80C (₹1.5 lakh limit)\n   - Section 80D for health insurance premiums (₹25,000 - ₹50,000 depending on age)\n   - Section 24 for home loan interest (₹2 lakh limit)\n`;
      if (homeLoanInterest) {
        suggestions += `   - Use the home loan interest deduction (Section 24) to save on interest payments.\n`;
      }
    }

    // Senior Citizen Benefits
    if (age >= 60) {
      suggestions += `2. As a senior citizen, you are eligible for higher exemptions and deductions, including:\n   - Higher deduction under Section 80D for health insurance (₹50,000).\n   - Exemption from tax on interest income up to ₹50,000 under Section 80TTB.\n`;
      suggestions += `3. Explore the Senior Citizens Saving Scheme (SCSS) for higher interest rates, which is tax-free up to a certain limit.\n`;
    }

    // Tax Suggestions for Investments
    if (investments?.includes("real-estate")) {
      suggestions += `4. Investing in real estate provides deductions on home loan interest under Section 24. You can also explore the benefits of long-term capital gains tax exemption under Section 54.\n`;
    }
    if (investments?.includes("stocks")) {
      suggestions += `5. Consider long-term equity investments to benefit from lower capital gains tax rates (10% for holding period over 1 year). You can also invest in the National Pension Scheme (NPS) for additional tax-saving benefits.\n`;
    }
    if (investments?.includes("mutual-funds")) {
      suggestions += `6. Mutual Funds can be an excellent way to diversify your portfolio. Equity Linked Savings Schemes (ELSS) offer tax benefits under Section 80C.\n`;
    }

    // Capital Gains and Losses
    if (capitalGains) {
      suggestions += `7. If you have long-term capital gains (LTCG), make sure to optimize your tax liability by using the ₹1 lakh exemption under Section 10(38). You may also offset your capital gains by capital loss harvesting.\n`;
    }

    // Retirement Planning
    if (retirementSavings) {
      suggestions += `8. Consider investing in retirement savings instruments like the National Pension Scheme (NPS) to avail additional deductions under Section 80CCD. This can also help in creating a tax-free retirement corpus.\n`;
    }

    // Charitable Donations
    if (charitableDonations) {
      suggestions += `9. Charitable donations can be claimed under Section 80G. Consider donating to eligible organizations to get 100% or 50% deductions, depending on the donation type.\n`;
    }

    // Other Tax-saving Methods
    if (otherExpenses) {
      suggestions += `10. Explore other methods like tax-free bonds, education loans, and rent receipts to reduce your taxable income.\n`;
    }

    // Rent Payments
    if (rentPayments) {
      suggestions += `11. If you are paying rent and do not own a home, you can claim a deduction under Section 80GG for house rent paid.\n`;
    }

    // Children's Education and Expenses
    if (children) {
      suggestions += `12. You can claim deductions under Section 80E for education loans taken for your children's higher education. In addition, explore the benefit of a deduction for any tuition fees paid under Section 80C.\n`;
    }

    // Additional General Tips
    suggestions += `13. You can choose between the new tax regime (with lower rates but no deductions) or the old regime (with deductions). Choose the one that works best based on your deductions and exemptions.\n`;
    suggestions += `14. Optimize salary structuring to include benefits like meal vouchers, Leave Travel Allowance (LTA), and special allowances for tax savings.\n`;
    suggestions += `15. For a more tax-efficient portfolio, consider diversifying across asset classes (debt, equity, real estate, etc.) to manage both returns and risks.\n`;

    // Health-related Expenses
    if (medicalExpenses) {
      suggestions += `16. You can claim deductions under Section 80D for medical insurance premiums (₹25,000 - ₹50,000 based on age) and also for critical illness coverage.\n`;
      suggestions += `17. If you incur medical expenses for dependents (parents, spouse, children), you can claim deductions for them under Section 80D and Section 80DD.\n`;
    }

    // Long-Term Financial Planning
    suggestions += `18. Begin tax-efficient financial planning early to build a solid wealth accumulation strategy. Long-term investments like the Public Provident Fund (PPF), National Savings Certificate (NSC), and tax-free bonds are essential.\n`;
    suggestions += `19. Consider creating a balanced investment portfolio that combines growth assets (stocks, real estate) and safe instruments (bonds, PPF) for optimal returns with minimal tax impact.\n`;

    // Tax-loss Harvesting
    suggestions += `20. Engage in tax-loss harvesting to offset gains by selling investments that are in a loss position. This strategy can help minimize your taxable capital gains.\n`;

    res.status(200).json({ suggestions });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
