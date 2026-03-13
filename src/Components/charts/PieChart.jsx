import { useContext, useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ExpenseContext } from "../../context/ExpenseContext";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { income, expense } = useContext(ExpenseContext);
  const chartRef = useRef(null);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income || 0, expense || 0],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  // ✅ Destroy old chart on unmount/re-render
  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.chartInstance?.destroy();
      }
    };
  }, [income, expense]);

  return <Pie ref={chartRef} data={data} />;
};

// ✅ Default export
export default PieChart;