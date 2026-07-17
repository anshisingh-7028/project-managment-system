import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";


const ManagerNavbar = ({
  setSidebarOpen
}) => {


  const navigate = useNavigate();

  const [profileOpen,setProfileOpen] = useState(false);


  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};



return (

<div
className="
relative
bg-gradient-to-r
from-slate-900/80
via-blue-900/70
to-purple-900/80
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-4
md:p-6
shadow-2xl
text-white
flex
justify-between
items-center
"
>


{/* LEFT SECTION */}

<div className="flex items-center gap-4">


{/* MOBILE MENU */}

<button

onClick={()=>
setSidebarOpen(true)
}

className="
lg:hidden
bg-blue-600
p-3
rounded-xl
hover:scale-110
transition
"

>

<FaBars/>

</button>



<div>

<h1
className="
text-xl
md:text-3xl
font-extrabold
"
>

Welcome back,
<span className="text-cyan-400">
 {" "} {user?.name}
</span>
👋

</h1>


<p
className="
text-gray-300
mt-1
text-sm
md:text-base
"
>

Manager Control Center

</p>


</div>


</div>





{/* RIGHT SECTION */}

<div
className="
flex
items-center
gap-4
"
>


{/* Notification */}

<button

onClick={()=>
navigate("/manager/notifications")
}

className="
relative
bg-white/10
p-3
rounded-xl
hover:bg-blue-600
transition
"

>

<FaBell
className="
text-xl
"
/>


<span
className="
absolute
top-1
right-1
w-3
h-3
bg-red-500
rounded-full
"
>

</span>


</button>





{/* PROFILE */}

<div
className="
relative
"
>


<button

onClick={()=>
setProfileOpen(!profileOpen)
}

className="
flex
items-center
gap-3
bg-white/10
px-3
py-2
rounded-2xl
hover:bg-white/20
transition
"

>


<div
className="
w-12
h-12
rounded-full
bg-gradient-to-r
from-blue-500
to-purple-600
flex
items-center
justify-center
"
>
<FaUserCircle
onClick={()=>
navigate("/manager/profile")
}
className="
text-4xl
cursor-pointer
"
/>

</div>



<div
className="
hidden
md:block
text-left
"
>

<p
className="
font-bold
"
>

{user?.name}

</p>


<p
className="
text-xs
text-gray-300
"
>

Manager

</p>


</div>



<FaChevronDown
className={`
hidden
md:block
transition
${profileOpen ? "rotate-180":""}
`}
/>


</button>





{/* Dropdown */}

{
profileOpen && (

<div
className="
absolute
right-0
mt-3
w-56
bg-slate-900
border
border-white/20
rounded-2xl
shadow-2xl
p-4
z-50
"
>


<div
className="
border-b
border-white/10
pb-3
mb-3
"
>

<p className="font-bold">

{user?.name}

</p>


<p className="text-sm text-gray-400">

{user?.email}

</p>


</div>


<button

onClick={()=>
navigate("/manager/profile")
}

className="
w-full
bg-blue-600
py-2
rounded-xl
hover:bg-blue-700
transition
"

>

View Profile

</button>


</div>

)

}



</div>


</div>



</div>

)

};


export default ManagerNavbar;