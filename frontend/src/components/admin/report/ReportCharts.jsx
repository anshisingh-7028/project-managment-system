import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReportCharts = ({ data }) => {
  const pieData = [
    { name: "Completed", value: data.completedTasks },
    { name: "In Progress", value: data.inProgressTasks },
    { name: "Pending", value: data.pendingTasks },
  ];

  const barData = [
    { name: "Users", value: data.totalUsers },
    { name: "Projects", value: data.totalProjects },
    { name: "Tasks", value: data.totalTasks },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

      {/* PIE CHART */}
      <div className="bg-white/10 p-5 rounded-xl">
        <h2 className="text-white mb-4 text-xl">
          Task Status Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/10 p-5 rounded-xl">
        <h2 className="text-white mb-4 text-xl">
          System Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ReportCharts;