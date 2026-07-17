import Project from "../models/Project.js";
import Task from "../models/Task.js";


export const getManagerAnalytics = async(req,res)=>{

try{

const managerId = req.user.id;


// manager projects

const projects = await Project.find({
manager:managerId
});


const projectIds =
projects.map(
p=>p._id
);


// tasks

const tasks = await Task.find({
project:{
$in:projectIds
}
});



// project stats

const projectStats={

total:projects.length,

completed:
projects.filter(
p=>p.status==="Completed"
).length,

inProgress:
projects.filter(
p=>p.status==="In Progress"
).length,

onHold:
projects.filter(
p=>p.status==="On Hold"
).length

};



// task stats

const taskStats={

total:tasks.length,

completed:
tasks.filter(
t=>t.status==="Completed"
).length,


pending:
tasks.filter(
t=>t.status==="To Do"
).length,


inProgress:
tasks.filter(
t=>t.status==="In Progress"
).length

};



// employee performance


const employees={};


tasks.forEach(task=>{


const id =
task.assignedTo.toString();


if(!employees[id]){

employees[id]={
total:0,
completed:0
};

}


employees[id].total++;


if(task.status==="Completed")
employees[id].completed++;


});



res.status(200).json({

projectStats,

taskStats,

employees

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};