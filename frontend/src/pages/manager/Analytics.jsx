import {useEffect,useState} from "react";
import axiosInstance from "../../services/axiosInstance";

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid
} from "recharts";


const Analytics=()=>{


const [data,setData]=useState({

projectStats:{},
taskStats:{}

});



const fetchAnalytics=async()=>{

try{


const res =
await axiosInstance.get(
"/analytics/manager"
);


setData(res.data);


}
catch(error){

console.log(error);

}


};



useEffect(()=>{

fetchAnalytics();

},[]);




const projectChart=[

{
name:"Completed",
value:data.projectStats.completed || 0
},

{
name:"Running",
value:data.projectStats.inProgress || 0
},

{
name:"On Hold",
value:data.projectStats.onHold || 0
}

];



const taskChart=[

{
name:"Completed",
value:data.taskStats.completed || 0
},

{
name:"Pending",
value:data.taskStats.pending || 0
},

{
name:"Progress",
value:data.taskStats.inProgress || 0
}

];





return(

<div className="
min-h-screen
text-white
space-y-8
">



{/* HEADER */}


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

📊 Manager Analytics

</h1>


<p className="
mt-3
text-blue-100
">

Project and Team Performance Overview

</p>


</div>





{/* STATS CARDS */}



<div className="
grid
md:grid-cols-4
gap-6
">


<div className="
bg-white/10
p-6
rounded-3xl
">

<h2>
Total Projects
</h2>

<p className="
text-4xl
font-bold
mt-3
">

{data.projectStats.total || 0}

</p>


</div>





<div className="
bg-white/10
p-6
rounded-3xl
">

<h2>
Completed Projects
</h2>

<p className="
text-4xl
font-bold
mt-3
text-green-400
">

{data.projectStats.completed || 0}

</p>


</div>





<div className="
bg-white/10
p-6
rounded-3xl
">

<h2>
Total Tasks
</h2>

<p className="
text-4xl
font-bold
mt-3
">

{data.taskStats.total || 0}

</p>


</div>





<div className="
bg-white/10
p-6
rounded-3xl
">

<h2>
Completed Tasks
</h2>

<p className="
text-4xl
font-bold
mt-3
text-green-400
">

{data.taskStats.completed || 0}

</p>


</div>


</div>





{/* CHART SECTION */}


<div className="
grid
lg:grid-cols-2
gap-8
">





{/* PROJECT PIE */}


<div className="
bg-white/10
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Project Status

</h2>



<div className="
h-80
">


<ResponsiveContainer>


<PieChart>


<Pie

data={projectChart}

dataKey="value"

nameKey="name"

outerRadius={110}

label

>


{
projectChart.map(
(entry,index)=>(

<Cell
key={index}
/>

))
}



</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>


</div>







{/* TASK BAR */}



<div className="
bg-white/10
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Task Status

</h2>



<div className="
h-80
">


<ResponsiveContainer>


<BarChart
data={taskChart}
>


<CartesianGrid/>


<XAxis
dataKey="name"
/>


<YAxis/>


<Tooltip/>


<Bar
dataKey="value"
/>


</BarChart>


</ResponsiveContainer>



</div>


</div>





</div>






</div>

)

}


export default Analytics;