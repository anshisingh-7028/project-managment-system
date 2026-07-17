import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Projects from "../pages/admin/Projects";
import Tasks from "../pages/admin/Tasks";
import Report from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import NotificationsPage from "../pages/admin/NotificationsPage";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeLayout from "../layouts/EmployeeLayout";

import EmployeeDashboard from "../pages/employee/Dashboard";
import MyTasks from "../pages/employee/MyTasks";
import MyProjects from "../pages/employee/MyProjects";
import EmployeeNotifications from "../pages/employee/Notifications";
import EmployeeProfile from "../pages/employee/Profile";
import EmployeeProjectDetails from "../pages/employee/EmployeeProjectDetails";
import ManagerLayout from "../layouts/ManagerLayout";

import ManagerDashboard from "../pages/manager/Dashboard";
import ManagerProjects from "../pages/manager/MyProjects";
import TeamTasks from "../pages/manager/TeamTasks";
import TeamMembers from "../pages/manager/TeamMembers";
import ManagerNotifications from "../pages/manager/Notifications";
import ManagerProfile from "../pages/manager/Profile";
import ProjectDetails from "../pages/manager/ProjectDetails";
import Analytics from "../pages/manager/Analytics";


const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
 path="/reset-password/:token"
 element={<ResetPassword />}
/>
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route path="/admin/users" element={
   <ProtectedRoute roles={["admin"]}>
    <Users />
   </ProtectedRoute>
  }
   />
<Route
  path="/admin/projects"
  element={
    <ProtectedRoute roles={["admin", "manager"]}>
      <Projects />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/tasks"
  element={
     <ProtectedRoute roles={["admin", "manager"]}>
      <Tasks />
    </ProtectedRoute>
 }
/>
 <Route path="/admin/reports" element={<Report />} />
 <Route path="/admin/settings" element={<Settings/>} />
 <Route path="/admin/notifications" element={<NotificationsPage />} />
 <Route
path="/unauthorized"
element={<Unauthorized/>}
/>
<Route
  path="/employee"
  element={
    <ProtectedRoute roles={["employee"]}>
      <EmployeeLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="dashboard"
    element={<EmployeeDashboard />}
  />

  <Route
    path="tasks"
    element={<MyTasks />}
  />

  <Route
    path="projects"
    element={<MyProjects />}
  />
  <Route
  path="projects/:id"
  element={<EmployeeProjectDetails />}
/>

  <Route
    path="notifications"
    element={<EmployeeNotifications />}
  />

  <Route
    path="profile"
    element={<EmployeeProfile />}
  />
</Route>

<Route
 path="/manager"
 element={
  <ProtectedRoute roles={["manager"]}>
    <ManagerLayout/>
  </ProtectedRoute>
 }
>



<Route
 path="dashboard"
 element={<ManagerDashboard/>}
/>


<Route
 path="projects"
 element={<ManagerProjects/>}
/>

<Route
 path="projects/:id"
 element={<ProjectDetails/>}
/>


<Route
 path="tasks"
 element={<TeamTasks/>}
/>


<Route
 path="team"
 element={<TeamMembers/>}
/>


<Route
 path="notifications"
 element={<ManagerNotifications/>}
/>


<Route
 path="profile"
 element={<ManagerProfile/>}
/>
<Route
path="analytics"
element={<Analytics/>}
/>


</Route>

    </Routes>
  );
};

export default AppRoutes;