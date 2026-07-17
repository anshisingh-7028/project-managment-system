import {
useEffect,
useState
} from "react";


import axiosInstance from "../../services/axiosInstance";

import TaskCard from "../../components/employee/TaskCard";



const MyTasks =()=>{


const [tasks,setTasks]=useState([]);

const [loading,setLoading]=useState(true);



const fetchTasks=async()=>{


try{


const res =
await axiosInstance.get(
"/tasks/my"
);


setTasks(
res.data.tasks || []
);



}
catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};




useEffect(()=>{

fetchTasks();

},[]);





const updateStatus=async(id,status)=>{


try{


await axiosInstance.put(

`/tasks/my/${id}`,

{
status
}

);



fetchTasks();



}
catch(error){

console.log(error);

}


};






return(


<div className="
min-h-screen
text-white
space-y-8
">



<h1 className="
text-4xl
font-bold
">

My Tasks 📋

</h1>




{

loading ?

<div className="
text-center
text-xl
">

Loading Tasks...

</div>


:


tasks.length===0 ?


<div className="
bg-white/10
p-8
rounded-3xl
text-center
">

No Tasks Assigned

</div>



:


<div className="
grid
lg:grid-cols-3
md:grid-cols-2
grid-cols-1
gap-6
">


{

tasks.map(task=>(


<TaskCard

key={task._id}

task={task}

updateStatus={updateStatus}

/>


))


}



</div>


}




</div>


)


}


export default MyTasks;