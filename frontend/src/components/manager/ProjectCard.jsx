import {
FaUsers,
FaTasks,
FaCalendar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ProjectCard=({project})=>{
    const navigate = useNavigate();


return(

<div className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-xl
hover:scale-105
transition
">


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



<div className="space-y-3">


<p className="flex gap-3">

<FaTasks/>

Status:

<span className="text-blue-300">
{project.status}
</span>

</p>



<p className="flex gap-3">

🔥 Priority:

<span>
{project.priority}
</span>

</p>



<p className="flex gap-3">

<FaUsers/>

Team Members:

<span>
{project.team?.length || 0}
</span>

</p>



<p className="flex gap-3">

<FaCalendar/>

{
project.startDate
?
new Date(project.startDate)
.toLocaleDateString()
:
"N/A"
}

-

{
project.endDate
?
new Date(project.endDate)
.toLocaleDateString()
:
"N/A"
}


</p>


</div>



<div className="
mt-6
">


<button

onClick={()=> 
navigate(`/manager/projects/${project._id}`)
}

className="
mt-6
w-full
bg-green-600
hover:bg-green-700
py-3
rounded-xl
font-semibold
"

>

View Details

</button>


</div>


</div>


)

}


export default ProjectCard;