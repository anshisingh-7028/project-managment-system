import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import WelcomeBanner from "../../components/admin/dashboard/WelcomeBanner";
import DashboardCharts from "../../components/admin/dashboard/DashboardCharts";
import RecentTasks from "../../components/admin/dashboard/RecentTasks";
import RecentProjects from "../../components/admin/dashboard/RecentProjects";
import ActivityFeed from "../../components/admin/dashboard/ActivityFeed";
import UpcomingDeadlines from "../../components/admin/dashboard/UpcomingDeadlines";
import QuickActions from "../../components/admin/dashboard/QuickActions";

import {
  FaUsers,
  FaTasks,
  FaProjectDiagram,
  FaCheckCircle,
  FaClock,
  FaUserTie,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH LIVE STATS
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
<div className="min-h-screen flex bg-black">


{/* SIDEBAR */}

<AdminSidebar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>



{/* MAIN CONTENT */}

<div

className="
flex-1
lg:ml-64
w-full
overflow-x-hidden
"

>


<div

className="
min-h-screen
bg-cover
bg-center
bg-fixed
"

style={{

backgroundImage:
"url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')"

}}

>


{/* OVERLAY */}

<div className="
min-h-screen
bg-black/70
">


{/* MOBILE HEADER */}

<div className="
lg:hidden
flex
items-center
justify-between
p-4
border-b
border-white/10
">


<button

onClick={()=>setSidebarOpen(true)}

className="
bg-blue-600
text-white
px-4
py-3
rounded-xl
"

>

☰

</button>



<h2 className="
text-white
font-bold
text-lg
"

>

Admin Dashboard

</h2>


</div>





{/* CONTENT */}

<div className="
p-4
sm:p-6
md:p-8
lg:p-10
">


{/* NAVBAR */}

<div className="
mb-6
"

>

<AdminNavbar/>

</div>





{/* HEADER */}

<div className="
mb-8
"

>


<h1 className="
text-white
text-2xl
sm:text-3xl
md:text-4xl
font-bold
"

>

🚀 Admin Dashboard Overview

</h1>



<p className="
text-gray-300
mt-2
text-sm
sm:text-base
"

>

Real-time system analytics

</p>


</div>





{/* LOADING */}

{
loading &&

<p className="
text-white
text-center
"

>

Loading stats...

</p>

}






{/* STATS CARDS */}

{
stats &&

<>


<WelcomeBanner/>




<div className="
grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-3

gap-5

mt-8

">


<StatsCard

title="Total Users"

value={stats.users}

subtitle="Managers + Employees"

icon={<FaUsers/>}

color="bg-blue-600"

/>



<StatsCard

title="Managers"

value={stats.managers}

subtitle="System Managers"

icon={<FaUserTie/>}

color="bg-indigo-600"

/>



<StatsCard

title="Projects"

value={stats.projects}

subtitle="Total Projects"

icon={<FaProjectDiagram/>}

color="bg-green-600"

/>



<StatsCard

title="Tasks"

value={stats.tasks}

subtitle="Overall Tasks"

icon={<FaTasks/>}

color="bg-yellow-500"

/>



<StatsCard

title="Completed"

value={stats.completedTasks}

subtitle="Finished Tasks"

icon={<FaCheckCircle/>}

color="bg-emerald-600"

/>



<StatsCard

title="Pending"

value={stats.pendingTasks}

subtitle="Need Attention"

icon={<FaClock/>}

color="bg-red-500"

/>


</div>


</>

}






{/* CHARTS */}

{
stats &&

<div className="
mt-8
overflow-x-auto
">

<DashboardCharts stats={stats}/>

</div>

}






{/* RECENT SECTION */}

<div className="
grid

grid-cols-1

lg:grid-cols-2

gap-6

mt-10

">


<div className="
overflow-x-auto
">

<RecentTasks

tasks={stats?.recentTasks}

/>

</div>



<div className="
overflow-x-auto
">

<RecentProjects

projects={stats?.recentProjects}

/>

</div>



</div>







{/* ACTIVITY */}

<div className="
mt-10
overflow-x-auto
">


<ActivityFeed

tasks={stats?.recentTasks}

/>


</div>





</div>


</div>


</div>


</div>


</div>

);
};

export default AdminDashboard;  