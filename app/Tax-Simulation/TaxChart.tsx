"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TaxChartProps {
  breakdown: string[];
}

const TaxChart: React.FC<TaxChartProps> = ({ breakdown }) => {
  // Parse breakdown into data for the chart
  const labels = breakdown.map((item, index) => `Slab ${index + 1}`);
  const dataValues = breakdown.map((item) => {
    const match = item.match(/₹([\d,]+\.?\d*)/); // Extract numbers from strings
    return match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Tax Breakdown (₹)",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `₹${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Tax Breakdown Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TaxChart;
