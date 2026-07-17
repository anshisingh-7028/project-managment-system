import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";


const ProjectDetails = () => {


const {id} = useParams();


const [data,setData] = useState({

project:{},
tasks:[],
stats:{}

});



const fetchDetails = async()=>{


try{


const res =
await axiosInstance.get(
`/projects/${id}/details`
);


setData(res.data);


}
catch(error){

console.log(error);

}


};



useEffect(()=>{

fetchDetails();

},[]);





const {
project,
tasks,
stats

}=data;



return (

<div className="
text-white
space-y-8
">



{/* HEADER */}


<div className="
bg-gradient-to-r
from-blue-600
via-indigo-600
to-purple-700
rounded-3xl
p-8
shadow-xl
">


<h1 className="
text-4xl
font-bold
">

{project.projectName}

</h1>


<p className="
text-blue-100
mt-3
">

{project.description}

</p>


<div className="
flex
gap-4
mt-5
flex-wrap
">


<span className="
bg-green-600
px-4
py-2
rounded-full
">

{project.status}

</span>


<span className="
bg-purple-600
px-4
py-2
rounded-full
">

{project.priority}

</span>


</div>


</div>







{/* STATS */}


<div className="
grid
md:grid-cols-4
gap-5
">



<Card
title="Total Tasks"
value={stats.totalTasks}
icon={<FaTasks/>}
/>



<Card
title="Completed"
value={stats.completedTasks}
icon={<FaCheckCircle/>}
/>



<Card
title="Pending"
value={stats.pendingTasks}
icon={<FaClock/>}
/>



<Card
title="Team Members"
value={project.team?.length || 0}
icon={<FaUsers/>}
/>



</div>







{/* PROGRESS */}


<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/20
">


<h2 className="
text-2xl
font-bold
mb-4
">

Project Progress

</h2>


<div className="
w-full
h-4
bg-gray-700
rounded-full
">


<div

className="
h-4
bg-green-500
rounded-full
"

style={{

width:`${stats.progress || 0}%`

}}

>


</div>


</div>


<p className="
mt-3
text-gray-300
">

{stats.progress || 0}% Completed

</p>


</div>








{/* TASKS */}



<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/20
">


<h2 className="
text-2xl
font-bold
mb-5
">

Project Tasks

</h2>



<div className="
space-y-4
">


{

tasks?.length > 0 ?

tasks.map((task)=>(


<div
key={task._id}
className="
bg-white/5
p-5
rounded-xl
flex
justify-between
items-center
"
>


<div>

<h3 className="
font-bold
text-lg
">

{task.title}

</h3>


<p className="
text-gray-400
">

Assigned To:
{task.assignedTo?.name}

</p>


</div>



<span className="
bg-blue-600
px-4
py-2
rounded-full
">

{task.status}

</span>



</div>


))


:

<p className="text-gray-400">
No Tasks Available
</p>


}


</div>



</div>









{/* TEAM */}



<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/20
">


<h2 className="
text-2xl
font-bold
mb-5
">

Team Members

</h2>



<div className="
grid
md:grid-cols-3
gap-5
">


{

project.team?.map((member)=>(


<div

key={member._id}

className="
bg-white/5
p-5
rounded-xl
"

>


<div className="
w-12
h-12
rounded-full
bg-blue-600
flex
items-center
justify-center
font-bold
text-xl
">

{member.name.charAt(0)}

</div>


<h3 className="
mt-3
font-bold
">

{member.name}

</h3>


<p className="
text-gray-400
text-sm
">

{member.email}

</p>


</div>


))


}



</div>


</div>




</div>


)

};





const Card=({
title,
value,
icon
})=>(


<div className="
bg-white/10
backdrop-blur-xl
rounded-2xl
p-6
border
border-white/20
">


<div className="
text-3xl
text-blue-400
">

{icon}

</div>


<p className="
text-gray-300
mt-3
">

{title}

</p>


<h2 className="
text-3xl
font-bold
">

{value || 0}

</h2>


</div>


)



export default ProjectDetails;