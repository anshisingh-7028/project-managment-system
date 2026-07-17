import {
FaTachometerAlt,
FaTasks,
FaProjectDiagram,
FaUser,
FaCog,
FaSignOutAlt,
FaTimes,
FaBell
} from "react-icons/fa";

import {
Link,
useLocation,
useNavigate
} from "react-router-dom";


const EmployeeSidebar=({
sidebarOpen,
setSidebarOpen
})=>{


const location=useLocation();
const navigate=useNavigate();


const user =
JSON.parse(localStorage.getItem("user")) || {};



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/login");

};



const menus=[

{
name:"Dashboard",
path:"/employee/dashboard",
icon:<FaTachometerAlt/>
},

{
name:"My Tasks",
path:"/employee/tasks",
icon:<FaTasks/>
},

{
name:"My Projects",
path:"/employee/projects",
icon:<FaProjectDiagram/>
},

{
name:"Profile",
path:"/employee/profile",
icon:<FaUser/>
},
{
name:"Notifications",
path:"/employee/notifications",
icon:<FaBell/>
}

];



return(

<>


{
sidebarOpen &&

<div

onClick={()=>setSidebarOpen(false)}

className="
fixed
inset-0
bg-black/60
z-40
lg:hidden
"

/>

}




<div

className={`
fixed
top-0
left-0
h-screen
w-64
bg-slate-900
text-white
z-50
transition-transform
duration-300

${sidebarOpen
?
"translate-x-0"
:
"-translate-x-full"
}

lg:translate-x-0

`}

>



<div
className="
p-6
border-b
border-slate-700
relative
">


<button

onClick={()=>setSidebarOpen(false)}

className="
lg:hidden
absolute
right-5
top-5
text-xl
"

>

<FaTimes/>

</button>



<h1 className="
text-3xl
font-bold
">

PMS

</h1>


<p className="
text-gray-400
">

Employee Panel

</p>




<div className="
mt-6
bg-slate-800
rounded-xl
p-4
">


<div className="
w-12
h-12
rounded-full
bg-blue-600
flex
items-center
justify-center
font-bold
text-xl
">

{
user.name?.charAt(0)
}

</div>


<h2 className="
mt-3
font-semibold
">

{user.name}

</h2>


<p className="
text-xs
text-gray-400
">

{user.email}

</p>


</div>



</div>





<div className="
p-4
space-y-2
">


{
menus.map(item=>(


<Link

key={item.path}

to={item.path}

onClick={()=>setSidebarOpen(false)}

className={`
flex
items-center
gap-4
p-4
rounded-xl
transition

${
location.pathname===item.path

?
"bg-blue-600"

:

"hover:bg-slate-800"

}

`}

>


<span>

{item.icon}

</span>


<span>

{item.name}

</span>


</Link>


))

}



</div>




<div className="
absolute
bottom-5
left-4
right-4
">


<button

onClick={logout}

className="
w-full
bg-red-600
hover:bg-red-700
py-3
rounded-xl
flex
items-center
justify-center
gap-3
"

>

<FaSignOutAlt/>

Logout

</button>


</div>



</div>


</>


)

}


export default EmployeeSidebar;