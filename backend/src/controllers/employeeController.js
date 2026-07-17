import Task from "../models/Task.js";
import Project from "../models/Project.js";


// ===============================
// EMPLOYEE DASHBOARD
// ===============================

export const getEmployeeDashboard = async(req,res)=>{

try{


const employeeId = req.user.id;



// Employee ke tasks

const tasks = await Task.find({

assignedTo: employeeId

})
.populate(
"project",
"projectName status"
)
.sort({
createdAt:-1
});





const totalTasks = tasks.length;



const completedTasks =
tasks.filter(
(task)=>task.status==="Completed"
).length;



const pendingTasks =
tasks.filter(
(task)=>task.status==="To Do"
).length;



const inProgressTasks =
tasks.filter(
(task)=>task.status==="In Progress"
).length;





// Projects from tasks

const projects = [
...new Map(

tasks.map(
(task)=>[
task.project?._id.toString(),
task.project
]
)

).values()

];





res.status(200).json({

success:true,


stats:{


totalTasks,

completedTasks,

pendingTasks,

inProgressTasks,

totalProjects:projects.length


},


recentTasks:
tasks.slice(0,5),


projects


});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};