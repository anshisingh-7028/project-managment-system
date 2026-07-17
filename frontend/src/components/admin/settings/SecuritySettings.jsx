import {useState} from "react";
import axiosInstance from "../../../services/axiosInstance";


const SecuritySettings=()=>{


const [form,setForm]=useState({

oldPassword:"",
newPassword:""

});


const handleChange=async()=>{


try{


const res =
await axiosInstance.put(
"/users/change-password",
form
);


alert(res.data.message);


setForm({
oldPassword:"",
newPassword:""
});


}
catch(error){

alert(
error.response?.data?.message
);

}


};



return(

<div>


<h2 className="
text-3xl
font-bold
text-white
mb-6
">

🔐 Security Settings

</h2>


<div className="space-y-5">


<input

type="password"

placeholder="Old Password"

value={form.oldPassword}

onChange={(e)=>

setForm({
...form,
oldPassword:e.target.value
})

}

className="
w-full
p-4
rounded-xl
bg-white/20
text-white
"

/>



<input

type="password"

placeholder="New Password"

value={form.newPassword}

onChange={(e)=>

setForm({
...form,
newPassword:e.target.value
})

}

className="
w-full
p-4
rounded-xl
bg-white/20
text-white
"

/>



<button

onClick={handleChange}

className="
bg-red-600
px-8
py-3
rounded-xl
text-white
font-bold
"

>

Change Password

</button>


</div>


</div>

);


};


export default SecuritySettings;