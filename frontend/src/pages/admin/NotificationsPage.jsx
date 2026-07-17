import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../services/socket";
import axiosInstance from "../../services/axiosInstance";

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handler = (data) => {
      setNotifications((prev) => [data, ...prev]);
    };

    socket.on("dashboard-update", handler);
    return () => socket.off("dashboard-update", handler);
  }, []);

  const markAsRead = async (id) => {
    await axiosInstance.put(`/notifications/read/${id}`);
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const deleteNotification = async (id) => {
    await axiosInstance.delete(`/notifications/${id}`);
    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  };

  const clearAll = async () => {
    await axiosInstance.delete("/notifications");
    setNotifications([]);
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-6 py-6">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <h1 className="text-xl sm:text-3xl font-bold">
          🔔 Notifications Center
        </h1>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            Close
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition"
          >
            Clear All
          </button>

        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "unread", "read"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base transition ${
              filter === type
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4 max-w-4xl mx-auto">

        {loading ? (
          <p className="text-gray-400 text-center">
            Loading...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center">
            No notifications found
          </p>
        ) : (
          filtered.map((n) => (
            <div
              key={n._id}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border transition-all ${
                n.isRead
                  ? "bg-white/5 border-white/10"
                  : "bg-blue-500/10 border-blue-500/30"
              }`}
            >

              {/* LEFT */}
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {n.message}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 flex-wrap sm:justify-end">

                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-sm"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n._id)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;