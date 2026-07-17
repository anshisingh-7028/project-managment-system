import { useEffect, useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import axiosInstance from "../../services/axiosInstance";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/notificationStore";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    users: [],
    projects: [],
    tasks: [],
  });

  const { notifications, addNotification } = useNotificationStore();

  const today = new Date();

  // ---------------- SEARCH ----------------
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults({ users: [], projects: [], tasks: [] });
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/dashboard/search?q=${value}`
      );
      setResults(res.data || { users: [], projects: [], tasks: [] });
    } catch (err) {
      console.log("SEARCH ERROR:", err);
    }
  };

  // ---------------- SOCKET NOTIFICATIONS ----------------
  useEffect(() => {
    const handler = (data) => {
      

      addNotification({
        id: Date.now(),
        title: data?.title || "Update",
        message: data?.message || "New Activity",
        type: data?.type || "system",
        time: new Date().toLocaleTimeString(),
        read: false,
      });
    };

    socket.on("dashboard-update", handler);

    return () => socket.off("dashboard-update", handler);
  }, []);

  // ---------------- UI ----------------
  return (
    <div 
className="
bg-white/10 
backdrop-blur-lg 
border 
border-white/20 
p-4
md:p-5
rounded-2xl 
shadow-xl 
flex 
flex-col
lg:flex-row
justify-between 
items-start
lg:items-center
gap-4
relative
"
>

      {/* LEFT */}
      <div>
       <h2 className="text-white 
text-xl
md:text-3xl 
font-bold">
  Welcome {user?.name || "User"} 👋
</h2>
        <p className="text-gray-300">
          {today.toDateString()}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex
items-center
gap-3
md:gap-5
relative
w-full
lg:w-auto">

        {/* SEARCH */}
        <div className="relative
flex-1
max-w-full
lg:max-w-md">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search users, projects, tasks..."
            className="bg-white/20 
text-white 
px-4 
py-2 
rounded-xl 
pl-10 
outline-none
w-full
md:w-64
lg:w-80"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-300" />

          {(
            results.users.length > 0 ||
            results.projects.length > 0 ||
            results.tasks.length > 0
          ) && (
            <div className="absolute
top-12
left-0
bg-black/90
text-white
w-full
md:w-72
rounded-xl
p-3
z-[9999]">

              {results.users.length > 0 && (
                <>
                  <p className="text-gray-300 text-sm">Users</p>
                  {results.users.map((u) => (
                    <p key={u._id} className="text-sm">{u.name}</p>
                  ))}
                </>
              )}

              {results.projects.length > 0 && (
                <>
                  <p className="text-gray-300 text-sm mt-2">Projects</p>
                  {results.projects.map((p) => (
                    <p key={p._id} className="text-sm">{p.projectName}</p>
                  ))}
                </>
              )}

              {results.tasks.length > 0 && (
                <>
                  <p className="text-gray-300 text-sm mt-2">Tasks</p>
                  {results.tasks.map((t) => (
                    <p key={t._id} className="text-sm">{t.title}</p>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* NOTIFICATIONS (FIXED) */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/admin/notifications")}
        >
          <FaBell className="text-white 
text-xl
md:text-2xl" />

          {notifications?.filter((n) => !n.read).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </div>

        {/* PROFILE */}
        <div className="hidden
md:flex
items-center 
gap-3 
bg-white/10 
px-4 
py-2 
rounded-xl">
          <FaUserCircle className="text-white text-4xl" />

          <div>
            <h3 className="text-white font-semibold">{user?.name}</h3>
            <p className="text-gray-300 text-sm">{user?.role}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;