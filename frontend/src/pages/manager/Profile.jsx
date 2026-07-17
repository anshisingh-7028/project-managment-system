import {useEffect,useState} from "react";
import axiosInstance from "../../services/axiosInstance";
import {
FaUserCircle,
FaEnvelope,
FaPhone,
FaBuilding,
FaSave,
 FaEye,
  FaEyeSlash,
} from "react-icons/fa";


const Profile=()=>{


const [user,setUser]=useState(null);

const [form,setForm]=useState({

name:"",
email:"",
phone:"",
department:"",
password:""

});


const [edit,setEdit]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

return (

<div className="text-white text-center">

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
border-white/20
shadow-2xl
">



{/* HEADER */}


<div className="
flex
flex-col
items-center
mb-8
">


{
user.avatar ?

<img
src={user.avatar}
className="
w-32
h-32
rounded-full
object-cover
"
/>

:

<FaUserCircle
className="
text-8xl
text-blue-400
"
/>

}



<h1 className="
text-4xl
font-bold
mt-5
">

{user.name}

</h1>


<p className="
text-blue-300
text-lg
">

Manager

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
"

/>

</div>




<div className="md:col-span-2">


<label>
New Password
</label>

<div className="relative mt-2">

  <input
    type={showPassword ? "text" : "password"}
    disabled={!edit}
    value={form.password}
    onChange={(e) =>
      setForm({
        ...form,
        password: e.target.value,
      })
    }
    placeholder="Enter new password"
    className="
    w-full
    p-4
    rounded-xl
    bg-white/20
    pr-14
    outline-none
    "
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-xl
    text-gray-300
    hover:text-white
    "
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
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
px-8
py-3
rounded-xl
bg-blue-600
"

>

Edit Profile

</button>

}




{
edit &&

<button

className="
px-8
py-3
rounded-xl
bg-green-600
flex
gap-2
items-center
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