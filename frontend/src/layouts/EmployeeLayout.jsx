import { Outlet } from "react-router-dom";
import { useState } from "react";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600')",
      }}
    >
      {/* Dark Overlay */}
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">

        <EmployeeSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:ml-64">

          <EmployeeNavbar
            setSidebarOpen={setSidebarOpen}
          />

          <main className="p-6">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
};

export default EmployeeLayout;