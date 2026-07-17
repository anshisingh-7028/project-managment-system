import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaProjectDiagram,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";


const Dashboard = () => {


const [tasks,setTasks] = useState([]);

const [projects,setProjects] = useState([]);


const user =
JSON.parse(localStorage.getItem("user")) || {};



const fetchDashboard = async()=>{

try{


const taskRes =
await axiosInstance.get(
"/tasks/my"
);


const projectRes =
await axiosInstance.get(
"/tasks/my-projects"
);



setTasks(
taskRes.data.tasks || []
);


setProjects(
projectRes.data.projects || []
);



}
catch(error){

console.log(error);

}


};




useEffect(()=>{

fetchDashboard();

},[]);





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



const cards=[

{
title:"My Tasks",
value:totalTasks,
icon:<FaTasks/>,
color:"from-blue-500 to-cyan-500"
},


{
title:"Completed",
value:completedTasks,
icon:<FaCheckCircle/>,
color:"from-green-500 to-emerald-500"
},


{
title:"Pending",
value:pendingTasks,
icon:<FaClock/>,
color:"from-orange-500 to-yellow-500"
},


{
title:"Projects",
value:projects.length,
icon:<FaProjectDiagram/>,
color:"from-purple-500 to-pink-500"
}

];




return(

<div className="
space-y-8
text-white
">



{/* HEADER */}

<div className="
rounded-3xl
p-8
bg-gradient-to-r
from-blue-700
via-indigo-700
to-purple-700
shadow-xl
">


<h1 className="
text-4xl
font-bold
">

Welcome Employee 👋

</h1>


<p className="
text-xl
mt-3
">

{user.name}

</p>


<p className="
text-gray-200
mt-2
">

Complete your assigned tasks and track your progress

</p>


</div>





{/* CARDS */}


<div className="
grid
xl:grid-cols-4
lg:grid-cols-2
grid-cols-1
gap-6
">


{
cards.map(card=>(


<div

key={card.title}

className={`
bg-gradient-to-r
${card.color}
p-6
rounded-3xl
shadow-xl
hover:scale-105
transition
`}

>


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-white/80
">

{card.title}

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

{card.value}

</h2>


</div>



<div className="
text-5xl
">

{card.icon}

</div>



</div>


</div>


))

}


</div>







{/* RECENT TASKS */}



<div className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

My Recent Tasks

</h2>



{

tasks.length===0

?

<p className="
text-gray-400
">

No Tasks Assigned

</p>


:


tasks.slice(0,5).map(task=>(


<div

key={task._id}

className="
bg-white/5
p-4
rounded-xl
mb-3
flex
justify-between
"


>


<div>

<h3 className="
font-semibold
">

{task.title}

</h3>


<p className="
text-gray-400
text-sm
">

{task.project?.projectName}

</p>


</div>



<span className="
bg-blue-500
px-3
py-1
rounded-full
text-sm
">

{task.status}

</span>


</div>


))


}


</div>






{/* PROJECTS */}



<div className="
bg-white/10
rounded-3xl
p-6
border
border-white/10
">


<h2 className="
text-2xl
font-bold
mb-5
">

My Projects

</h2>


{

projects.length===0

?

<p className="
text-gray-400
">

No Projects Assigned

</p>


:


projects.map(project=>(


<div

key={project._id}

className="
bg-white/5
p-4
rounded-xl
mb-3
"


>


<h3 className="
font-semibold
">

{project.projectName}

</h3>


<p className="
text-gray-400
">

{project.description}

</p>


<p className="
text-blue-300
mt-2
">

Status: {project.status}

</p>


</div>


))


}



</div>






</div>


)

};


export default Dashboard;