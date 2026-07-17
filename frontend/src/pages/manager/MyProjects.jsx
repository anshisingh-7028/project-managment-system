import {useEffect,useState} from "react";
import axiosInstance from "../../services/axiosInstance";
import ProjectCard from "../../components/manager/ProjectCard";


const MyProjects =()=>{


const [projects,setProjects]=useState([]);


const fetchProjects=async()=>{

try{

const res=
await axiosInstance.get("/projects");


setProjects(res.data);


}
catch(error){

console.log(error);

}

};



useEffect(()=>{

fetchProjects();

},[]);



return(

<div className="text-white">


<h1 className="
text-4xl
font-bold
mb-8
">

📁 My Projects

</h1>


{
projects.length===0 ?

(
<div className="
bg-white/10
p-8
rounded-3xl
text-center
">

No Projects Assigned

</div>
)

:

(

<div className="
grid
lg:grid-cols-3
md:grid-cols-2
grid-cols-1
gap-6
">

{
projects.map((project)=>(

<ProjectCard
key={project._id}
project={project}
/>

))
}

</div>

)

}


</div>

)

}


export default MyProjects;