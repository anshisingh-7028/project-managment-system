import {
FaCalendar,
FaFlag,
FaCheckCircle
} from "react-icons/fa";


const TaskCard = ({task,updateStatus})=>{


return(

<div
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
text-xl
font-bold
text-white
mb-3
">

{task.title}

</h2>



<p className="
text-gray-300
text-sm
mb-4
">

{task.description || "No Description"}

</p>




<div className="space-y-3">


<p className="flex gap-3 text-gray-200">

<FaFlag/>

Priority:

<span className="
text-yellow-300
">

{task.priority}

</span>

</p>



<p className="flex gap-3 text-gray-200">

<FaCalendar/>

Due:

{
task.dueDate
?
new Date(task.dueDate)
.toLocaleDateString()
:
"N/A"
}

</p>



<p className="flex gap-3 text-gray-200">

<FaCheckCircle/>

Status:

<span>

{task.status}

</span>

</p>


</div>





<select

value={task.status}

onChange={(e)=>
updateStatus(
task._id,
e.target.value
)
}

className="
mt-5
w-full
p-3
rounded-xl
bg-black/30
text-white
outline-none
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




</div>


)

}


export default TaskCard;