import {
  FaProjectDiagram,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import {useEffect,useState} from "react";
import axiosInstance from "../../services/axiosInstance";


const Dashboard = () => {
  const [stats,setStats]=useState({

projects:0,
tasks:0,
completedTasks:0,
pendingTasks:0,
teamMembers:0,
inProcessTasks:0,
recentTasks:[],
teamPerformance:[],

});


const user =
JSON.parse(localStorage.getItem("user")) || {};



const cards=[

{
title:"My Projects",
value:stats.projects,
icon:<FaProjectDiagram/>,
color:"from-blue-500 to-cyan-500"
},

{
title:"Team Tasks",
value:stats.tasks,
icon:<FaTasks/>,
color:"from-purple-500 to-pink-500"
},

{
title:"Completed Tasks",
value:stats.completedTasks,
icon:<FaCheckCircle/>,
color:"from-green-500 to-emerald-500"
},

{
title:"Pending Tasks",
value:stats.pendingTasks,
icon:<FaClock/>,
color:"from-orange-500 to-yellow-500"
},

];

const fetchDashboard=async()=>{

try{

const res=
await axiosInstance.get(
"/manager/dashboard"
);



setStats({
  projects: res.data.projects,
  tasks: res.data.tasks,
  completedTasks: res.data.completedTasks,
  pendingTasks: res.data.pendingTasks,
  teamMembers: res.data.teamMembers,
  teamPerformance: res.data.teamPerformance || [],
  recentTasks: res.data.recentTasks || [],
});


}
catch(error){

console.log(error);

}

};



useEffect(()=>{

fetchDashboard();

},[]);




return(

<div className="
min-h-screen
text-white
space-y-8
">


{/* HEADER */}

<div
className="
rounded-3xl
p-8
bg-gradient-to-r
from-blue-700
via-indigo-700
to-purple-700
shadow-2xl
"
>


<h1 className="
text-4xl
font-bold
">

Welcome Manager 👋

</h1>


<p className="
text-xl
mt-3
text-blue-100
">

{user.name}

</p>


<p className="
text-gray-200
mt-2
">

Manage your team and projects efficiently

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
cards.map((card)=>(


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





{/* TEAM PERFORMANCE */}

<div className="
grid
lg:grid-cols-2
gap-6
">


<div
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/10
"
>


<h2 className="
text-2xl
font-bold
mb-5
">

Team Performance

</h2>



<div className="
space-y-5
">

{
stats.teamPerformance.length > 0 ?

stats.teamPerformance.map((item)=>(

<div key={item.name}>

<div className="flex justify-between mb-2">

<span>{item.name}</span>

<span>{item.progress}%</span>

</div>

<div className="w-full h-3 bg-gray-700 rounded-full">

<div
className="h-3 bg-blue-500 rounded-full"
style={{ width: `${item.progress}%` }}
></div>

</div>

</div>

))

:

<p className="text-gray-400">
No Team Performance Available
</p>

}

</div>


</div>







{/* RECENT ACTIVITIES */}


<div
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/10
"
>


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Activities

</h2>



<div className="
space-y-4
">

<div className="space-y-4">

{
stats.recentTasks.length > 0 ?

stats.recentTasks.map((task)=>(

<div
key={task._id}
className="
bg-white/5
p-4
rounded-xl
hover:bg-white/10
transition
"
>

<p className="font-semibold">
{task.title}
</p>


<div className="flex justify-between mt-2">

<span className="text-gray-400 text-sm">
{task.status}
</span>


<span className="text-gray-400 text-sm">
Today
</span>

</div>


</div>


))

:

<div className="text-gray-400">
No Recent Tasks
</div>

}

</div>





</div>



</div>


</div>





{/* TEAM SUMMARY */}


<div
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/10
flex
items-center
gap-5
"
>


<div className="
text-5xl
text-blue-400
">

<FaUsers/>

</div>


<div>

<h2 className="
text-3xl
font-bold
">

{stats.teamMembers} Team Members

</h2>


<p className="
text-gray-300
">

Working under your projects

</p>


</div>


</div>



</div>

)

};


export default Dashboard;  