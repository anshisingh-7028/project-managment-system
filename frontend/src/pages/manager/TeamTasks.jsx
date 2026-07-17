import {useEffect,useState} from "react";
import axiosInstance from "../../services/axiosInstance";

import {
 FaBars,
 FaSearch,
 FaPlus
} from "react-icons/fa";


import ManagerTaskTable from "../../components/manager/ManagerTaskTable";
import CreateManagerTaskModal from "../../components/manager/CreateManagerTaskModal";
import EditManagerTaskModal from "../../components/manager/EditManagerTaskModal";


const TeamTasks =()=>{


const [tasks,setTasks]=useState([]);

const [search,setSearch]=useState("");

const [showCreate,setShowCreate]=useState(false);

const [showEdit,setShowEdit]=useState(false);

const [editTask,setEditTask]=useState(null);



const fetchTasks=async()=>{

try{

const res=
await axiosInstance.get("/tasks");


setTasks(res.data);


}catch(error){

console.log(error);

}

};



useEffect(()=>{

fetchTasks();

},[]);



const deleteTask=async(id)=>{

try{

await axiosInstance.delete(
`/tasks/${id}`
);


alert("Task Deleted");


fetchTasks();


}catch(error){

alert(
error.response?.data?.message
);

}

};



const filteredTasks=
tasks.filter((task)=>
task.title
.toLowerCase()
.includes(
search.toLowerCase()
)
);



return(


<div className="
min-h-screen
text-white
space-y-8
">


{/* Header */}

<div className="
bg-gradient-to-r
from-blue-700
to-purple-700
rounded-3xl
p-8
shadow-xl
">


<h1 className="
text-4xl
font-bold
">

Team Tasks 👨‍💻

</h1>


<p className="
mt-3
text-blue-100
">

Manage your team tasks efficiently

</p>


</div>




{/* Stats */}


<div className="
grid
md:grid-cols-3
gap-6
">


<div className="
bg-white/10
p-6
rounded-3xl
">

<h2 className="text-xl">
Total Tasks
</h2>

<p className="text-4xl font-bold">
{tasks.length}
</p>

</div>



<div className="
bg-green-600
p-6
rounded-3xl
">

<h2>
Completed
</h2>

<p className="text-4xl font-bold">

{
tasks.filter(
t=>t.status==="Completed"
).length
}

</p>

</div>




<div className="
bg-orange-600
p-6
rounded-3xl
">

<h2>
Pending
</h2>


<p className="text-4xl font-bold">

{
tasks.filter(
t=>t.status==="To Do"
).length
}

</p>


</div>


</div>





{/* Search + Button */}


<div className="
flex
flex-col
md:flex-row
gap-5
justify-between
">


<div className="
relative
w-full
md:w-96
">


<FaSearch
className="
absolute
left-4
top-5
"
/>


<input

placeholder="Search Task..."

value={search}

onChange={
(e)=>setSearch(e.target.value)
}

className="
w-full
bg-white/20
rounded-xl
p-4
pl-12
outline-none
"
/>


</div>




<button

onClick={()=>
setShowCreate(true)
}

className="
bg-blue-600
px-6
py-3
rounded-xl
flex
gap-3
items-center
hover:bg-blue-700
"

>

<FaPlus/>

Create Task

</button>


</div>






<ManagerTaskTable

tasks={filteredTasks}

setEditTask={setEditTask}

setShowModal={setShowEdit}

handleDelete={deleteTask}

/>




{
showCreate &&

<CreateManagerTaskModal

setShowCreateModal={setShowCreate}

fetchTasks={fetchTasks}

/>

}



{
showEdit &&

<EditManagerTaskModal

task={editTask}

setShowModal={setShowEdit}

fetchTasks={fetchTasks}

/>

}



</div>


)


};


export default TeamTasks;