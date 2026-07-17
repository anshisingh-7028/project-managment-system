import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
   FaTimes,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";



const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
className={`
fixed
top-0
left-0
h-screen
w-64
bg-slate-600
transition-transform
duration-300
z-50

${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          PMS
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Admin Panel
        </p>
        <button
onClick={()=>setSidebarOpen(false)}
className="text-white text-2xl"
>

<FaTimes/>

</button>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4">

        <Link
          to="/admin/dashboard"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          mb-2
          "
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

       {user?.role === "admin" && (
        <Link
          to="/admin/users"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          mb-2
          "
        >
          <FaUsers />
          Users
        </Link>
        )}

       {["admin", "manager"].includes(user?.role) && (
        <Link
          to="/admin/projects"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          mb-2
          "
        >
          <FaProjectDiagram />
          Projects
        </Link>
       )}

      {["admin", "manager"].includes(user?.role) && (
        <Link
          to="/admin/tasks"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          mb-2
          "
        >
          <FaTasks />
          Tasks
        </Link>
      )}
       {user?.role === "admin" && (
        <Link
          to="/admin/reports"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          mb-2
          "
        >
          <FaChartBar />
          Reports
        </Link>
       )}
        {user?.role === "admin" && (
        <Link
          to="/admin/settings"
          className="
          flex
          items-center
          gap-4
          p-4
          rounded-xl
          hover:bg-blue-600
          transition
          "
        >
          <FaCog />
          Settings
        </Link>
        )}

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          bg-red-600
          hover:bg-red-700
          p-3
          rounded-xl
          transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminSidebar;