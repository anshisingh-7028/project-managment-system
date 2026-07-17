import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import TeamTable from "../../components/manager/TeamTable";
import { FaUsers, FaSearch } from "react-icons/fa";

const TeamMembers = () => {

const [members,setMembers]=useState([]);

const [search,setSearch]=useState("");



const fetchMembers=async()=>{

try{

const res =
await axiosInstance.get(
"/users/manager/team"
);


setMembers(res.data);

}
catch(err){

console.log(err);

}

};



useEffect(()=>{

fetchMembers();

},[]);



const filteredMembers=

members.filter((member)=>

member.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);




return(

<div className="space-y-8 text-white">

<div>

<h1 className="text-5xl font-bold">

👥 Team Members

</h1>

<p className="text-gray-300 mt-2">

Manage your team efficiently

</p>

</div>



<div className="relative max-w-md">

<FaSearch
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-300
"
/>

<input

type="text"

placeholder="Search Employee"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="
w-full
pl-12
pr-4
py-3
rounded-xl
bg-white/10
border
border-white/20
outline-none
"

/>

</div>


<TeamTable members={filteredMembers}/>

</div>

);

};

export default TeamMembers;