import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const globalSearch = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) return res.json({ users: [], projects: [], tasks: [] });

    const users = await User.find({
      name: { $regex: q, $options: "i" },
    }).limit(5);

    const projects = await Project.find({
      projectName: { $regex: q, $options: "i" },
    }).limit(5);

    const tasks = await Task.find({
      title: { $regex: q, $options: "i" },
    }).limit(5);

    res.json({ users, projects, tasks });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // USERS
    const totalUsers = await User.countDocuments();

    const totalManagers = await User.countDocuments({
      role: "manager",
    });

    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    // PROJECTS
    const totalProjects = await Project.countDocuments();

    const completedProjects = await Project.countDocuments({
      status: "Completed",
    });

    const progressProjects = await Project.countDocuments({
      status: "In Progress",
    });

    const notStartedProjects = await Project.countDocuments({
      status: "Not Started",
    });

    const holdProjects = await Project.countDocuments({
      status: "On Hold",
    });

    // TASKS
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
 status:{
   $in:[
     "To Do",
     "On Hold"
   ]
 }
});

    const progressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    // HIGH PRIORITY
    const highPriorityTasks = await Task.countDocuments({
      priority: "High",
    });

    // RECENT USERS
    const recentUsers = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // RECENT PROJECTS
    const recentProjects = await Project.find()
      .populate("manager", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // RECENT TASKS
    const recentTasks = await Task.find()
      .populate("assignedTo", "name")
      .populate("project", "projectName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      users: totalUsers,
      managers: totalManagers,
      employees: totalEmployees,

      projects: totalProjects,
      completedProjects,
      progressProjects,
      notStartedProjects,
      holdProjects,

      tasks: totalTasks,
      completedTasks,
      pendingTasks,
      progressTasks,

      highPriorityTasks,

      recentUsers,
      recentProjects,
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// MANAGER DASHBOARD
// ===============================

export const getManagerDashboard = async (req, res) => {
  try {

    const managerId = req.user.id;


    // Manager ke projects
    const projects = await Project.find({
  manager: managerId
})
.populate("team", "name email")
.populate("manager", "name email");


    const projectIds = projects.map(
      project => project._id
    );



    // Manager ke project tasks

    const tasks = await Task.find({
      project: {
        $in: projectIds
      }
    })
    .populate(
      "assignedTo",
      "name email"
    )
    .populate(
      "project",
      "projectName"
    )
    .sort({
      createdAt:-1
    });



    // Team members

  const team = projects.flatMap(
  project => project.team || []
);


    const totalMembers = [
      ...new Set(
        team.map(
          id=>id.toString()
        )
      )
    ].length;



    const completedTasks =
      tasks.filter(
        task=>task.status==="Completed"
      ).length;



    const pendingTasks =
      tasks.filter(
        task=>task.status==="To Do"
      ).length;



    const inProgressTasks =
      tasks.filter(
        task=>task.status==="In Progress"
      ).length;

      // ===============================
// TEAM PERFORMANCE
// ===============================

const teamPerformance = [];

const uniqueMembers = [...new Set(team.map(id => id.toString()))];

for (const memberId of uniqueMembers) {

  const member = await User.findById(memberId).select("name");

  const memberTasks = tasks.filter(
    task => task.assignedTo?._id?.toString() === memberId
  );

  const total = memberTasks.length;

  const completed = memberTasks.filter(
    task => task.status === "Completed"
  ).length;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  teamPerformance.push({
    name: member?.name || "Unknown",
    totalTasks: total,
    completedTasks: completed,
    progress,
  });

}

    res.status(200).json({

success:true,

stats:{

projects:projects.length,

tasks:tasks.length,

completedTasks,

pendingTasks,

inProgressTasks,

teamMembers:totalMembers,

teamPerformance

},

recentTasks:tasks.slice(0,5),

projects

});  

    


  } catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }
};

// ===============================
// EMPLOYEE DASHBOARD
// ===============================

export const getEmployeeDashboard = async(req,res)=>{

try{

const employeeId = req.user.id;


// employee ke tasks

const tasks = await Task.find({
assignedTo: employeeId
})
.populate(
"project",
"projectName status priority"
)
.sort({
createdAt:-1
});



// projects

const projects = await Project.find({

team: employeeId

});




// task count

const totalTasks = tasks.length;


const completedTasks =
tasks.filter(
task=>task.status==="Completed"
).length;



const pendingTasks =
tasks.filter(
task=>task.status==="To Do"
).length;



const inProgressTasks =
tasks.filter(
task=>task.status==="In Progress"
).length;




const progress =
totalTasks===0
?
0
:
Math.round(
(completedTasks/totalTasks)*100
);




res.status(200).json({

success:true,


stats:{


totalTasks,

completedTasks,

pendingTasks,

inProgressTasks,

totalProjects:projects.length,

progress


},


recentTasks:
tasks.slice(0,5),


projects


});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};