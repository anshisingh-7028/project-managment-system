import {
useState
} from "react";

import axiosInstance from "../../../services/axiosInstance";


const NotificationSettings = ()=>{


const user =
JSON.parse(
localStorage.getItem("user")
)||{};



const [settings,setSettings]=useState(

user.notificationSettings || {

email:true,
task:true,
project:true

}

);



const updateValue=(key)=>{

setSettings({

...settings,

[key]:
!settings[key]

});

};



const saveSettings=async()=>{

try{


await axiosInstance.put(

"/users/notification-settings",

settings

);


alert(
"Notification Settings Updated"
);


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

Notification Settings

</h2>



<div className="space-y-5">


{
[

{
key:"email",
title:"Email Notifications"
},

{
key:"task",
title:"Task Notifications"
},

{
key:"project",
title:"Project Notifications"
}


].map(item=>(


<div
key={item.key}
className="
flex
justify-between
items-center
bg-white/10
p-5
rounded-xl
"
>


<p className="text-white text-lg">
{item.title}
</p>



<button

onClick={()=>updateValue(item.key)}

className={`
px-6
py-2
rounded-full
font-bold

${
settings[item.key]
?
"bg-green-600"
:
"bg-red-600"

}

`}
>

{
settings[item.key]
?
"ON"
:
"OFF"
}

</button>


</div>


))

}


</div>


<button

onClick={saveSettings}

className="
mt-8
bg-blue-600
px-8
py-3
rounded-xl
text-white
font-bold
"

>

Save Changes

</button>


</div>

);


};


export default NotificationSettings;