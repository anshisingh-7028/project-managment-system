import { useState } from "react";
import {
  FaUserCog,
  FaBell,
  FaLock,
  FaPalette,
  FaBars,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ProfileSettings from "../../components/admin/settings/ProfileSettings";
import NotificationSettings from "../../components/admin/settings/NotificationSettings";
import SecuritySettings from "../../components/admin/settings/SecuritySettings";
import AppearanceSettings from "../../components/admin/settings/AppearanceSettings";

const Settings = () => {
  const [tab, setTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    {
      id: "profile",
      title: "Profile",
      icon: <FaUserCog />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <FaBell />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "security",
      title: "Security",
      icon: <FaLock />,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: <FaPalette />,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div
        className="flex-1 lg:ml-64 bg-cover bg-center min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="min-h-screen bg-black/70 backdrop-blur-sm">

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-blue-600 p-3 rounded-xl"
            >
              <FaBars />
            </button>

            <h2 className="text-white text-xl font-bold">
              Settings
            </h2>

          </div>

          <div className="p-4 md:p-8">

            {/* Header */}
            <div className="mb-8">

              <h1 className="text-4xl font-bold text-white">
                ⚙️ Admin Settings
              </h1>

              <p className="text-gray-300 mt-2">
                Manage your account, security, notifications and appearance.
              </p>

            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`rounded-2xl p-5 transition duration-300 border
                  ${
                    tab === item.id
                      ? `bg-gradient-to-r ${item.color} border-transparent scale-105 shadow-xl`
                      : "bg-white/10 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">

                    <div className="text-3xl text-white">
                      {item.icon}
                    </div>

                    <span className="font-semibold text-white">
                      {item.title}
                    </span>

                  </div>
                </button>
              ))}

            </div>

            {/* Content */}
            <div
              className="
              bg-white/10
              backdrop-blur-xl
              rounded-3xl
              border
              border-white/20
              shadow-2xl
              p-4
              md:p-8
              "
            >

              {tab === "profile" && <ProfileSettings />}

              {tab === "notifications" && (
                <NotificationSettings />
              )}

              {tab === "security" && (
                <SecuritySettings />
              )}

              {tab === "appearance" && (
                <AppearanceSettings />
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;