import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getReportData = async (req, res) => {
  try {
    const { range } = req.query;

    let dateFilter = {};

    const now = new Date();

    if (range === "7d") {
      dateFilter = {
        createdAt: {
          $gte: new Date(now.setDate(now.getDate() - 7)),
        },
      };
    }

    if (range === "30d") {
      dateFilter = {
        createdAt: {
          $gte: new Date(now.setDate(now.getDate() - 30)),
        },
      };
    }

    const users = await User.countDocuments();
    const projects = await Project.countDocuments();
    const tasks = await Task.countDocuments(dateFilter);

    const completedTasks = await Task.countDocuments({
      ...dateFilter,
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      ...dateFilter,
      status: { $ne: "Completed" },
    });

    const recentTasks = await Task.find(dateFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("assignedTo", "name")
      .populate("project", "projectName");

    const recentProjects = await Project.find(dateFilter)
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      users,
      projects,
      tasks,
      completedTasks,
      pendingTasks,
      recentTasks,
      recentProjects,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};