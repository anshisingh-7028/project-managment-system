import Task from "../models/Task.js";
import { io } from "../../server.js";
import { createNotification } from "./notificationController.js";
import Project from "../models/Project.js";

// ============================
// CREATE TASK
// ============================
export const createTask = async (req, res) => {

  try {
    const task = await Task.create(req.body);

    const notification = await createNotification(
      "New Task",
      `${task.title} created`,
      "task"
    );

    io.emit("dashboard-update", {
      type: "TASK_CREATED",
      message: `${task.title} created`,
      notification,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL TASKS
// ============================
export const getTasks = async (req, res) => {
  try {

    let query = {};


    // Employee ke liye
    if(req.user.role === "employee"){
      query = {
        assignedTo:req.user.id
      };
    }


    // Manager ke liye
    if(req.user.role === "manager"){

      const projects = await Project.find({
        manager:req.user.id
      }).select("_id");


      const projectIds =
      projects.map(
        project=>project._id
      );


      query = {
        project:{
          $in:projectIds
        }
      };

    }



    const tasks = await Task.find(query)

    .populate(
      "project",
      "projectName"
    )

    .populate(
      "assignedTo",
      "name email"
    )

    .sort({
      createdAt:-1
    });



    res.status(200).json(tasks);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};
// ============================
// GET SINGLE TASK
// ============================
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "projectName")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// UPDATE TASK
// ============================
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    const notification = await createNotification(
      "Task Updated",
      `${task.title} updated`,
      "task"
    );

    io.emit("dashboard-update", {
      type: "TASK_UPDATED",
      message: `${task.title} updated`,
      notification,
    });

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// DELETE TASK
// ============================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    const notification = await createNotification(
      "Task Deleted",
      `${task.title} deleted`,
      "task"
    );

    io.emit("dashboard-update", {
      type: "TASK_DELETED",
      message: `${task.title} deleted`,
      notification,
    });

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET MY TASKS (EMPLOYEE)
// ============================

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("project", "projectName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// UPDATE MY TASK STATUS
// ============================

export const updateMyTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    const notification = await createNotification(
      "Task Status Updated",
      `${task.title} marked as ${status}`,
      "task"
    );

    io.emit("dashboard-update", notification);

    res.status(200).json({
      success: true,
      message: "Status Updated",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("project")
      .populate("assignedTo", "name");

    const uniqueProjects = [];

    const map = new Map();

    tasks.forEach((task) => {
      if (
        task.project &&
        !map.has(task.project._id.toString())
      ) {
        map.set(task.project._id.toString(), task.project);
      }
    });

    uniqueProjects.push(...map.values());

    res.status(200).json({
      success: true,
      projects: uniqueProjects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};