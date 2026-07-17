import Project from "../models/Project.js";
import { io } from "../../server.js";
import { createNotification } from "./notificationController.js";
import Task from "../models/Task.js";

// GET PROJECTS

export const getProjects = async (req, res) => {
  try {
    let query = {};

    // Employee ko sirf uske assigned projects dikhen
    if (req.user.role === "employee") {
      query = {
        team: req.user.id,
      };
    }

    // Manager ko sirf uske projects dikhen
    if (req.user.role === "manager") {
      query = {
        manager: req.user.id,
      };
    }

    const projects = await Project.find(query)

      .populate("manager", "name email")
      .populate("team", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      manager,
      team,
      priority,
      status,
      startDate,
      endDate,
    } = req.body;

    const project = await Project.create({
      projectName,
      description,
      manager,
      team,
      priority,
      status,
      startDate,
      endDate,
    });

    const notification = await createNotification(
      "New Project",
      `${project.projectName} created`,
      "project"
    );

    io.emit("dashboard-update", notification);

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const notification = await createNotification(
      "Project Updated",
      `${project.projectName} updated`,
      "project"
    );

    io.emit("dashboard-update", {
      type: "PROJECT_UPDATED",
      message: `${project.projectName} updated`,
      notification,
    });

    res.status(200).json({
      message: "Project Updated Successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const notification = await createNotification(
      "Project Deleted",
      `${project.projectName} deleted`,
      "project"
    );

    io.emit("dashboard-update", {
      type: "PROJECT_DELETED",
      message: `${project.projectName} deleted`,
      notification,
    });

    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("manager", "name email")
      .populate("team", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Employee Access
    if (req.user.role === "employee") {
      const isMember = project.team.some(
        (member) => member._id.toString() === req.user.id
      );

      if (!isMember) {
        return res.status(403).json({
          message: "Access Denied",
        });
      }
    }

    // Manager Access
    if (
      req.user.role === "manager" &&
      project.manager &&
      project.manager._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const tasks = await Task.find({
      project: project._id,
    }).populate("assignedTo", "name email");

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "To Do"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const progress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      project,
      tasks,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        progress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};