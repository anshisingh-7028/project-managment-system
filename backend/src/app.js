import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js"; 
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
const app = express();

app.use(cors({
 origin:[
  "http://localhost:5173",
  "https://project-managment-system-si4m.vercel.app"
   
  
 ],
 credentials:true
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications",notificationRoutes);
app.use(
"/api/manager",
managerRoutes
);
app.use(
"/api/analytics",
analyticsRoutes
);

app.use(
"/api/employee",
employeeRoutes
);



export default app;