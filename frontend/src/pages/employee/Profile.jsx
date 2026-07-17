import {
FaUserCircle,
FaSave,
FaEye,
FaEyeSlash
} from "react-icons/fa";

import {
useEffect,
useState
} from "react";


import axiosInstance from "../../services/axiosInstance";



const Profile =()=>{


const [user,setUser]=useState(null);


const [edit,setEdit]=useState(false);
const [showPassword,setShowPassword]=useState(false);



const [form,setForm]=useState({

name:"",
email:"",
phone:"",
department:"",
password:""

});





const fetchProfile=async()=>{


try{


const res =
await axiosInstance.get(
"/users/profile"
);



setUser(res.data);



setForm({

name:res.data.name || "",

email:res.data.email || "",

phone:res.data.phone || "",

department:res.data.department || "",

password:""

});



}
catch(error){

console.log(error);

}


};





useEffect(()=>{

fetchProfile();

},[]);







const updateProfile=async(e)=>{

e.preventDefault();


try{


await axiosInstance.put(

"/users/profile",

form

);



alert(
"Profile Updated Successfully"
);


setEdit(false);


fetchProfile();



}
catch(error){

alert(
error.response?.data?.message ||
"Update Failed"
);

}



};






if(!user)

return(

<div className="
text-white
text-center
">

Loading...

</div>

);






return(


<div className="
min-h-screen
text-white
">



<div className="
max-w-4xl
mx-auto
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8
border
border-white/10
shadow-xl
">





<div className="
flex
flex-col
items-center
mb-8
">


<FaUserCircle

className="
text-8xl
text-blue-400
"

/>



<h1 className="
text-4xl
font-bold
mt-4
">

{user.name}

</h1>



<p className="
text-blue-300
">

Employee

</p>


</div>






<form

onSubmit={updateProfile}

className="
grid
md:grid-cols-2
gap-6
"

>





<div>

<label>
Name
</label>


<input

disabled={!edit}

value={form.name}

onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}

className="
w-full
mt-2
p-4
rounded-xl
bg-white/20
outline-none
"

/>


</div>







<div>

<label>
Email
</label>


<input

disabled={!edit}

value={form.email}

onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}

className="
w-full
mt-2
p-4
rounded-xl
bg-white/20
outline-none
"

/>


</div>






<div>

<label>
Phone
</label>


<input

disabled={!edit}

value={form.phone}

onChange={(e)=>
setForm({
...form,
phone:e.target.value
})
}

className="
w-full
mt-2
p-4
rounded-xl
bg-white/20
outline-none
"

/>


</div>






<div>

<label>
Department
</label>


<input

disabled={!edit}

value={form.department}

onChange={(e)=>
setForm({
...form,
department:e.target.value
})
}

className="
w-full
mt-2
p-4
rounded-xl
bg-white/20
outline-none
"

/>


</div>






<div className="
md:col-span-2
">


<label>
New Password
</label>

<div className="relative">


<input

type={
showPassword
?
"text"
:
"password"
}

disabled={!edit}

value={form.password}

onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}

placeholder="Enter new password"

className="
w-full
mt-2
p-4
pr-12
rounded-xl
bg-white/20
outline-none
"

/>



<button

type="button"

disabled={!edit}

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-1/2
mt-1
text-xl
text-gray-300
"

>


{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}


</button>


</div>


</div>







<div className="
md:col-span-2
flex
justify-center
gap-5
mt-5
">



{

!edit &&

<button

type="button"

onClick={()=>setEdit(true)}

className="
bg-blue-600
px-8
py-3
rounded-xl
"

>

Edit Profile

</button>


}





{

edit &&

<button

className="
bg-green-600
px-8
py-3
rounded-xl
flex
items-center
gap-2
"

>


<FaSave/>

Save Changes


</button>


}



</div>






</form>






</div>

</div>


)


}


export default Profile;