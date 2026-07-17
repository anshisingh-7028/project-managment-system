import {
FaUsers,
FaCalendar,
FaTasks
} from "react-icons/fa";

import {
useEffect,
useState
} from "react";

import axiosInstance from "../../services/axiosInstance";



const MyProjects =()=>{


const [projects,setProjects]=useState([]);

const [loading,setLoading]=useState(true);





const fetchProjects=async()=>{

try{


const res =
await axiosInstance.get(
"/tasks/my-projects"
);



setProjects(
res.data.projects || []
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

fetchProjects();

},[]);






return(


<div className="
text-white
space-y-8
">



<h1 className="
text-4xl
font-bold
">

My Projects 📁

</h1>





{

loading ?

<div className="
text-center
text-xl
">

Loading Projects...

</div>


:


projects.length===0 ?


<div className="
bg-white/10
p-8
rounded-3xl
text-center
">

No Projects Assigned

</div>



:


<div className="
grid
xl:grid-cols-3
lg:grid-cols-2
grid-cols-1
gap-6
">


{

projects.map(project=>(



<div

key={project._id}

className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
shadow-xl
hover:scale-105
transition
"

>


<h2 className="
text-2xl
font-bold
mb-3
">

{project.projectName}

</h2>




<p className="
text-gray-300
mb-5
">

{project.description}

</p>





<div className="
space-y-3
">



<p className="
flex
gap-3
">

<FaTasks/>

Status:

<span className="
text-blue-300
">

{project.status}

</span>

</p>




<p className="
flex
gap-3
">

Priority:

<span className="
text-yellow-300
">

{project.priority}

</span>


</p>





<p className="
flex
gap-3
">

<FaUsers/>

Team Members:

<span>

{
project.team?.length || 0
}

</span>


</p>






<p className="
flex
gap-3
">

<FaCalendar/>

{

project.endDate

?

new Date(
project.endDate
)
.toLocaleDateString()

:

"N/A"

}


</p>



</div>




</div>



))


}



</div>


}



</div>


)


}



export default MyProjects;