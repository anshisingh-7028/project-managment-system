import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";


const CreateManagerTaskModal = ({
  setShowCreateModal,
  fetchTasks
}) => {


const [projects,setProjects]=useState([]);

const [employees,setEmployees]=useState([]);



const [form,setForm]=useState({

title:"",
description:"",
project:"",
assignedTo:"",
priority:"Medium",
status:"To Do",
startDate:"",
dueDate:""

});




// Fetch Manager Projects + Employees

useEffect(()=>{

fetchProjects();

fetchEmployees();

},[]);



const fetchProjects=async()=>{

try{

const res =
await axiosInstance.get("/projects");


setProjects(res.data);


}
catch(error){

console.log(error);

}

};



const fetchEmployees=async()=>{

try{

const res =
await axiosInstance.get("/users");



setEmployees(

res.data.filter(
(user)=>user.role==="employee"
)

);


}
catch(error){

console.log(error);

}

};





const handleCreate=async(e)=>{

e.preventDefault();



try{


await axiosInstance.post(
"/tasks",
form
);


alert(
"Task Created Successfully"
);


fetchTasks();


setShowCreateModal(false);



}
catch(error){

alert(
error.response?.data?.message ||
"Task Creation Failed"
);


}


};




return(


<div className="
fixed
inset-0
bg-black/70
flex
justify-center
items-center
z-50
p-4
">



<div className="
bg-orange-700
rounded-3xl
w-full
max-w-4xl
p-8
max-h-[90vh]
overflow-y-auto
">



<h2 className="
text-3xl
font-bold
text-center
text-black
mb-8
">

🚀 Create Team Task

</h2>




<form

onSubmit={handleCreate}

className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"

>



<input

type="text"

placeholder="Task Title"

value={form.title}

onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}

className="
border
rounded-xl
p-4
"

/>





<select

value={form.project}

onChange={(e)=>
setForm({
...form,
project:e.target.value
})
}

className="
border
rounded-xl
p-4
text-black
bg-white
"

>


<option value="">
Select Project
</option>


{
projects.map((project)=>(


<option

key={project._id}

value={project._id}

>

{project.projectName}

</option>


))

}


</select>






<select

value={form.assignedTo}

onChange={(e)=>
setForm({
...form,
assignedTo:e.target.value
})
}

className="
border
rounded-xl
p-4
text-black
bg-white
"

>


<option value="">
Assign Employee
</option>



{
employees.map((emp)=>(


<option

key={emp._id}

value={emp._id}

>

{emp.name}

</option>


))

}



</select>







<select

value={form.priority}

onChange={(e)=>
setForm({
...form,
priority:e.target.value
})
}

className="
border
rounded-xl
p-4
text-black
bg-white
"

>


<option>
High
</option>


<option>
Medium
</option>


<option>
Low
</option>


</select>








<select

value={form.status}

onChange={(e)=>
setForm({
...form,
status:e.target.value
})
}


className="
border
rounded-xl
p-4
text-black
bg-white
"

>


<option>
To Do
</option>


<option>
In Progress
</option>


<option>
Completed
</option>


</select>







<input

type="date"

value={form.startDate}

onChange={(e)=>
setForm({
...form,
startDate:e.target.value
})
}

className="
border
rounded-xl
p-4
"

/>





<input

type="date"

value={form.dueDate}

onChange={(e)=>
setForm({
...form,
dueDate:e.target.value
})
}

className="
border
rounded-xl
p-4
"

/>







<textarea

rows="5"

placeholder="Task Description"

value={form.description}

onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}

className="
md:col-span-2
border
rounded-xl
p-4
resize-none
"

/>







<div className="
md:col-span-2
flex
justify-end
gap-4
mt-5
">



<button

type="button"

onClick={()=>setShowCreateModal(false)}

className="
bg-gray-500
text-white
px-6
py-3
rounded-xl
"

>

Cancel

</button>





<button

type="submit"

className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
hover:bg-blue-700
"

>

Create Task

</button>



</div>




</form>





</div>




</div>


);


};


export default CreateManagerTaskModal;