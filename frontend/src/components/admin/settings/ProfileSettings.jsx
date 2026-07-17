import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";


const ProfileSettings = ()=>{


const oldUser =
JSON.parse(localStorage.getItem("user")) || {};


const [form,setForm]=useState({

name:oldUser.name || "",
phone:oldUser.phone || "",
avatar:oldUser.avatar || ""

});


const handleUpdate = async(e)=>{

e.preventDefault();


try{

const res =
await axiosInstance.put(
"/users/profile",
form
);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);


alert("Profile Updated");


}catch(error){

alert(
error.response?.data?.message
);

}

};



return (

<div>

<h2 className="text-3xl text-white font-bold mb-6">
Profile Settings
</h2>


<form
onSubmit={handleUpdate}
className="space-y-5"
>


<input
value={form.name}
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
placeholder="Name"
className="
w-full
p-4
rounded-xl
bg-white/20
text-white
"
/>


<input
value={form.phone}
onChange={(e)=>
setForm({
...form,
phone:e.target.value
})
}
placeholder="Phone"
className="
w-full
p-4
rounded-xl
bg-white/20
text-white
"
/>



<input
value={form.avatar}
onChange={(e)=>
setForm({
...form,
avatar:e.target.value
})
}
placeholder="Avatar URL"
className="
w-full
p-4
rounded-xl
bg-white/20
text-white
"
/>


<button
className="
bg-blue-600
px-8
py-3
rounded-xl
text-white
font-bold
"
>
Save Profile
</button>


</form>


</div>

);

};


export default ProfileSettings;