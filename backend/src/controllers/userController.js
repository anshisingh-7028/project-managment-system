import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { io } from "../../server.js";
import { createNotification } from "./notificationController.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

// GET USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const notification = await createNotification(
      "New User",
      `${user.name} joined`,
      "user"
    );

    io.emit("dashboard-update", {
      type: "USER_CREATED",
      notification,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = await createNotification(
      "User Updated",
      `${updatedUser.name} updated`,
      "user"
    );

    io.emit("dashboard-update", {
      type: "USER_UPDATED",
      notification,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = await createNotification(
      "User Deleted",
      "One user removed",
      "user"
    );

    io.emit("dashboard-update", {
      type: "USER_DELETED",
      notification,
    });

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROFILE (FIXED)
export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // ❌ FIXED: yaha notification undefined tha (BUG FIX)
    const notification = await createNotification(
      "Profile Updated",
      `${user.name} updated profile`,
      "profile"
    );

    io.emit("dashboard-update", {
      type: "PROFILE_UPDATED",
      notification,
    });

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// GET MY PROFILE
// ===============================

export const getProfile = async(req,res)=>{

try{

const user = await User.findById(
req.user.id
).select("-password");


if(!user){

return res.status(404).json({

message:"User not found"

});

}


res.status(200).json(user);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};

// ===============================
// GET MANAGER TEAM MEMBERS
// ===============================
export const getManagerTeam = async (req, res) => {
  try {
    const managerId = req.user.id;

    // Manager ke projects
    const projects = await Project.find({
      manager: managerId,
    }).populate("team", "name email");

    const memberMap = new Map();

    projects.forEach((project) => {
      project.team.forEach((member) => {
        memberMap.set(member._id.toString(), member);
      });
    });

    const result = [];

    for (const member of memberMap.values()) {
      const totalTasks = await Task.countDocuments({
        assignedTo: member._id,
      });

      const completedTasks = await Task.countDocuments({
        assignedTo: member._id,
        status: "Completed",
      });

      const pendingTasks = await Task.countDocuments({
        assignedTo: member._id,
        status: { $in: ["To Do", "In Progress"] },
      });

      const progress =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

      result.push({
        _id: member._id,
        name: member.name,
        email: member.email,
        totalTasks,
        completedTasks,
        pendingTasks,
        progress,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// UPDATE USER ROLE
// ===============================

export const updateUserRole = async (req, res) => {

  try {

    const { role } = req.body;


    const user = await User.findById(
      req.params.id
    );


    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }


    user.role = role;


    await user.save();



    res.status(200).json({

      success:true,

      message:"Role Updated Successfully",

      user

    });


  }
  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

export const updateNotificationSettings =
async(req,res)=>{

try{


const user =
await User.findByIdAndUpdate(

req.user._id,

{
notificationSettings:req.body
},

{
new:true
}

);


res.status(200).json({

success:true,

notificationSettings:
user.notificationSettings

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};

export const changePassword = async(req,res)=>{

try{

const user = await User.findById(req.user._id);


const isMatch =
await bcrypt.compare(
req.body.oldPassword,
user.password
);


if(!isMatch){

return res.status(400).json({
message:"Old password incorrect"
});

}


const newPassword =
await bcrypt.hash(
req.body.newPassword,
10
);


user.password = newPassword;


await user.save();


res.status(200).json({

success:true,
message:"Password changed successfully"

});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};
