import React from "react";
import {
 FaEdit,
 FaTrash
} from "react-icons/fa";


const ManagerTaskTable = ({
 tasks,
 setEditTask,
 setShowModal,
 handleDelete
}) => {



const statusColor=(status)=>{

switch(status){

case "Completed":
return "bg-green-600";

case "In Progress":
return "bg-blue-600";

case "To Do":
return "bg-orange-600";

default:
return "bg-gray-600";

}

};



const priorityColor=(priority)=>{


switch(priority){

case "High":
return "bg-red-600";


case "Medium":
return "bg-yellow-600";


case "Low":
return "bg-green-600";


default:
return "bg-gray-600";

}

};



return (

<div className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-xl
">


<h2 className="
text-3xl
font-bold
mb-8
">

👨‍💻 Team Tasks

</h2>




{/* Desktop Table */}


<div className="
hidden
lg:block
overflow-x-auto
">


<table className="
w-full
text-white
">


<thead className="
bg-blue-700
">


<tr>

<th className="p-4">
Task
</th>


<th className="p-4">
Project
</th>


<th className="p-4">
Assigned Employee
</th>


<th className="p-4">
Priority
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Due Date
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>



<tbody>


{
tasks.length===0 ?


<tr>

<td
colSpan="7"
className="
text-center
py-10
text-gray-300
"
>

No Tasks Found

</td>

</tr>


:


tasks.map((task)=>(


<tr

key={task._id}

className="
border-b
border-white/10
hover:bg-white/10
transition
text-center
"

>


<td className="
p-4
font-semibold
">

{task.title}

</td>



<td className="p-4">

{
task.project?.projectName ||
"N/A"
}

</td>



<td className="p-4">

{
task.assignedTo?.name ||
"N/A"
}

</td>




<td className="p-4">


<span
className={`
${priorityColor(task.priority)}
px-3
py-1
rounded-full
text-sm
`}
>

{task.priority}

</span>


</td>




<td className="p-4">


<span
className={`
${statusColor(task.status)}
px-3
py-1
rounded-full
text-sm
`}
>

{task.status}

</span>


</td>




<td className="p-4">

{
task.dueDate?.slice(0,10)
}


</td>




<td className="
p-4
flex
justify-center
gap-3
">


<button

onClick={()=>{

setEditTask(task);

setShowModal(true);

}}

className="
bg-blue-600
p-3
rounded-full
hover:bg-blue-700
"

>

<FaEdit/>

</button>



<button

onClick={()=>handleDelete(task._id)}

className="
bg-red-600
p-3
rounded-full
hover:bg-red-700
"

>

<FaTrash/>

</button>



</td>


</tr>


))


}


</tbody>



</table>



</div>






{/* Mobile Cards */}



<div className="
lg:hidden
space-y-5
">


{
tasks.length===0 ?

<div className="
text-center
text-gray-300
py-10
">

No Tasks Found

</div>


:


tasks.map((task)=>(


<div

key={task._id}

className="
bg-white/10
border
border-white/20
rounded-2xl
p-5
"

>


<h2 className="
text-xl
font-bold
">

{task.title}

</h2>



<p className="text-gray-300 mt-2">

📁 {task.project?.projectName}

</p>



<p className="text-gray-300">

👤 {task.assignedTo?.name}

</p>



<p className="text-gray-300">

📅 {task.dueDate?.slice(0,10)}

</p>




<div className="
flex
gap-3
mt-4
">


<span
className={`
${priorityColor(task.priority)}
px-3
py-1
rounded-full
`}
>

{task.priority}

</span>


<span
className={`
${statusColor(task.status)}
px-3
py-1
rounded-full
`}
>

{task.status}

</span>


</div>




<div className="
flex
gap-4
mt-5
">


<button

onClick={()=>{

setEditTask(task);

setShowModal(true);

}}

className="
flex-1
bg-blue-600
py-3
rounded-xl
"

>

Edit

</button>



<button

onClick={()=>handleDelete(task._id)}

className="
flex-1
bg-red-600
py-3
rounded-xl
"

>

Delete

</button>



</div>




</div>


))


}



</div>



</div>


);

};


export default ManagerTaskTable;