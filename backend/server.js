import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

import http from "http";
import { Server } from "socket.io";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

connectDB();

/* -----------------------------
   HTTP SERVER (IMPORTANT)
----------------------------- */
const server = http.createServer(app);

/* -----------------------------
   SOCKET SETUP
----------------------------- */
const io = new Server(server, {
  
cors:{
   origin:[
    "http://localhost:5173",
    "project-managment-system-si4m.vercel.app",
    
   ],
   methods:[
    "GET",
    "POST",
    "PUT",
    "DELETE"
   ],
   credentials:true
 }
});
io.on("connection", (socket) => {
  console.log("⚡ User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected");
  });
});

/* -----------------------------
   ROUTES
----------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Project Management API Running");
});

/* -----------------------------
   EXPORT io for controllers
----------------------------- */
export { io };

/* -----------------------------
   START SERVER
----------------------------- */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});