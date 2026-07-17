import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import ReportCharts from "../../components/admin/report/ReportCharts";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { exportPDF, exportCSV } from "../../utils/exportReport";

const Report = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    recentTasks: [],
    recentProjects: [],
  });

  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/reports?range=${range}`);

      // SAFE MAPPING FIX
      setData({
        totalUsers: res.data.totalUsers || res.data.users || 0,
        totalProjects: res.data.totalProjects || res.data.projects || 0,
        totalTasks: res.data.totalTasks || res.data.tasks || 0,
        completedTasks: res.data.completedTasks || 0,
        inProgressTasks: res.data.inProgressTasks || 0,
        pendingTasks: res.data.pendingTasks || 0,
        recentTasks: res.data.recentTasks || [],
        recentProjects: res.data.recentProjects || [],
      });

    } catch (err) {
      console.log("REPORT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [range]);

  const progress =
    data.totalTasks > 0
      ? (data.completedTasks / data.totalTasks) * 100
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR FIX */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
      {/* MAIN CONTENT */}
<div
className="
flex-1
lg:ml-64
min-h-screen
bg-cover
bg-center
"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80')",
}}
>
<div
className="
min-h-screen
bg-black/10
backdrop-blur-sm
p-4
md:p-8
"
>
        
          {/* HEADER + MENU BUTTON */}
<div 
className="
flex
flex-col
sm:flex-row
justify-center
gap-4
mb-10
"
>

            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden bg-blue-600 px-3 py-2 rounded"
            >
              ☰
            </button>

            <h1 className="text-3xl font-bold">
              📊 Analytics Report
            </h1>

          </div>

          {/* FILTER */}
          <div className="flex gap-3 mb-6">
            {["7d", "30d"].map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-4 py-2 rounded ${
                  range === item ? "bg-blue-600" : "bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* EXPORT */}
           <div className="flex justify-center gap-4 mb-10"> <button 
           onClick={() => exportPDF({
    users: data.totalUsers,
    projects: data.totalProjects,
    tasks: data.totalTasks,
    completedTasks: data.completedTasks,
    pendingTasks: data.pendingTasks,
           })} className="bg-red-600 px-5 py-2 rounded-xl hover:scale-105 transition" > Export PDF </button>
            <button 
            onClick={() => exportCSV({
    users: data.totalUsers,
    projects: data.totalProjects,
    tasks: data.totalTasks,
    completedTasks: data.completedTasks,
    pendingTasks: data.pendingTasks,
            })} className="bg-green-600 px-5 py-2 rounded-xl hover:scale-105 transition" > Export CSV </button> 
            </div>

          {/* STATS */}

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Stat title="Users" value={data.totalUsers} />
            <Stat title="Projects" value={data.totalProjects} />
            <Stat title="Tasks" value={data.totalTasks} />

          </div>

           
          {/* PROGRESS */}
          <div className="mt-10">
            <h2 className="mb-2">Progress</h2>

            <div className="w-full bg-gray-700 h-4 rounded">
              <div
                className="bg-green-500 h-4 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm mt-2">
              {Math.round(progress)}% completed
            </p>
          </div>

          {/* CHARTS */}
          <div className="mt-10">
            <ReportCharts data={data} />
          </div>

        </div>
      </div>
    </div>
  );
};

/* SMALL CARD */
const Stat = ({ title, value }) => (
  <div
    className="
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    p-6
    rounded-3xl
    shadow-xl
    hover:scale-105
    transition
    "
  >

    <h3 className="text-gray-300 text-lg">
      {title}
    </h3>

    <p className="text-4xl font-bold mt-3">
      {value ?? 0}
    </p>

  </div>
);
export default Report;  