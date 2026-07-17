import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardCharts = ({ stats }) => {
  if (!stats) return null;

  // 📊 TASK STATUS DATA
  const taskData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        label: "Tasks",
        data: [
          stats.completedTasks,
          stats.pendingTasks,
          stats.progressTasks,
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
      },
    ],
  };

  // 📊 PROJECT STATUS DATA
  const projectData = {
    labels: ["Completed", "In Progress", "Not Started", "On Hold"],
    datasets: [
      {
        label: "Projects",
        data: [
          stats.completedProjects,
          stats.progressProjects,
          stats.notStartedProjects,
          stats.holdProjects,
        ],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#facc15",
          "#ef4444",
        ],
      },
    ],
  };

  // 📈 LINE CHART (DUMMY TREND)
  const trendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Task Trend",
        data: [12, 19, 8, 15, 22, 30],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.3)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

      {/* TASK CHART */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
        <h2 className="text-white text-xl font-bold mb-4">
          Task Analytics
        </h2>
        <Doughnut data={taskData} />
      </div>

      {/* PROJECT CHART */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
        <h2 className="text-white text-xl font-bold mb-4">
          Project Status
        </h2>
        <Bar data={projectData} />
      </div>

      {/* TREND CHART */}
      <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
        <h2 className="text-white text-xl font-bold mb-4">
          Weekly Progress Trend
        </h2>
        <Line data={trendData} />
      </div>

    </div>
  );
};

export default DashboardCharts;