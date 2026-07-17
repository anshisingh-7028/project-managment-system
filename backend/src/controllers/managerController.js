import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";


export const getManagerDashboard = async(req,res)=>{

try{

const managerId=req.user._id;



// projects created by manager

const projects = await Project.find({
manager:managerId
});



// tasks under manager projects

const projectIds = projects.map(
project=>project._id
);


const tasks = await Task.find({
project:{
$in:projectIds
}
})
.populate("assignedTo","name email");



// team members

const teamMembers = await User.find({
manager:managerId,
role:"employee"
});



const completedTasks = tasks.filter(
task=>task.status==="completed"
).length;


const pendingTasks = tasks.filter(
task=>task.status!=="completed"
).length;



res.status(200).json({

projects:projects.length,

tasks:tasks.length,

completedTasks,

pendingTasks,

teamMembers:teamMembers.length,


recentTasks:
tasks.slice(0,5),

recentProjects:
projects.slice(0,5)

});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};