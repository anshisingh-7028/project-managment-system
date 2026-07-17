import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaChartBar
} from "react-icons/fa";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const ManagerSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menus = [
    {
      to: "/manager/dashboard",
      icon: <FaTachometerAlt />,
      name: "Dashboard",
    },
    {
      to: "/manager/projects",
      icon: <FaProjectDiagram />,
      name: "My Projects",
    },
    {
      to: "/manager/tasks",
      icon: <FaTasks />,
      name: "Team Tasks",
    },
    {
      to: "/manager/team",
      icon: <FaUsers />,
      name: "Team Members",
    },
    {
      to: "/manager/notifications",
      icon: <FaBell />,
      name: "Notifications",
    },
    {
      to: "/manager/profile",
      icon: <FaUser />,
      name: "Profile",
    },
  {
  to: "/manager/analytics",
  icon: <FaChartBar />,
  name: "Analytics",
},


  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
className={`
fixed
top-0
left-0
h-screen
w-64
bg-slate-900
text-white
shadow-2xl
z-50
flex
flex-col
transition-transform
duration-300
     
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 relative">

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute right-5 top-6 text-2xl"
          >
            <FaTimes />
          </button>

          <h1 className="text-3xl font-bold">
            PMS
          </h1>

          <p className="text-gray-400 text-sm">
            Manager Panel
          </p>

          <div className="mt-6 bg-slate-800 rounded-2xl p-4">

            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold mb-3">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="font-semibold">
              {user?.name}
            </h2>

            <p className="text-xs text-gray-400 break-all">
              {user?.email}
            </p>

          </div>
        </div>

        {/* Menu */}
        <div 
className="
p-4
space-y-2
flex-1
overflow-y-auto
"
>

          {menus.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`
              flex
              items-center
              gap-4
              p-4
              rounded-xl
              transition-all
              duration-300

              ${
                location.pathname === item.to
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
              }
              `}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          ))}

        </div>

        {/* Logout */}
        
          <div className="p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="
            w-full
            bg-red-600
            hover:bg-red-700
            transition
            duration-300
            rounded-xl
            py-3
            flex
            justify-center
            items-center
            gap-3
            font-semibold
            "
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>
    </>
  );
};

export default ManagerSidebar;