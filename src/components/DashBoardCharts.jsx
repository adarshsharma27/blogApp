import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashBoardCharts = () => {
  const options = {
    responsive: true,
    plugins: {},
  };

  const data = {
    labels: ["Total Users", "Total Blogs", "Trending Blogs"],
    datasets: [
      {
        label: "Application Record",
        data: [20, 25, 35],
        backgroundColor: "#A855F7",
        borderColor: "#A855F7",
        radius: "0",
      },
    ],
  };
  return (
    <>
      <div className="py-4 container">
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default DashBoardCharts;
