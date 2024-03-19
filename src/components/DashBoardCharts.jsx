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
import { useTranslation } from "react-i18next";

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

const DashBoardCharts = ({ users, blogs, trendingBlogs }) => {
  const { t } = useTranslation();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Montserrat', 'sans-serif'",
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          family: "'Montserrat', 'sans-serif'",
        },
        bodyFont: {
          family: "'Montserrat', 'sans-serif'",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Montserrat', 'sans-serif'",
            weight: "bold",
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Montserrat', 'sans-serif'",
            weight: "bold",
          },
        },
      },
    },
  };

  const data = {
    labels: [
      t("DashBoardTitle.Total Users"),
      t("DashBoardTitle.Total Blogs"),
      t("DashBoardTitle.Trending Blogs"),
    ],
    datasets: [
      {
        label: "Application Record",
        data: [users, blogs, trendingBlogs],
        backgroundColor: "#A855F7",
        borderColor: "#A855F7",
        radius: "0",
      },
    ],
  };
  return (
    <>
      <div className="my-6 w-full p-4 container h-[50vh] md:h-[80vh] card-shadow-custom rounded-lg">
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default DashBoardCharts;
