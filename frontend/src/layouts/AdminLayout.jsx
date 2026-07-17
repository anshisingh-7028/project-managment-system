import {useState} from "react";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";

import EmployeeNavbar from "../components/employee/EmployeeNavbar";


const EmployeeLayout=({children})=>{


const [sidebarOpen,setSidebarOpen]=useState(false);



return(

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-blue-950
to-purple-950
">


<EmployeeSidebar

sidebarOpen={sidebarOpen}

setSidebarOpen={setSidebarOpen}

/>



<div className="
lg:ml-64
">


<EmployeeNavbar

setSidebarOpen={setSidebarOpen}

/>


<main className="
p-4
md:p-8
">

{children}

</main>


</div>


</div>


)


}


export default EmployeeLayout;