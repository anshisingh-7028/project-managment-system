import {
useEffect,
useState
} from "react";


import axiosInstance from "../../services/axiosInstance";



const Notifications =()=>{


const [notifications,setNotifications]=useState([]);




const fetchNotifications=async()=>{

try{


const res =
await axiosInstance.get(
"/notifications"
);


setNotifications(res.data);


}
catch(error){

console.log(error);

}


};




useEffect(()=>{

fetchNotifications();

},[]);

const markRead = async(id)=>{

try{

await axiosInstance.put(
`/notifications/read/${id}`
);


setNotifications(prev=>

prev.map(item=>

item._id===id

?

{
...item,
isRead:true
}

:

item

)

);


}

catch(error){

console.log(error);

}

};

const deleteNotification = async(id)=>{

try{

await axiosInstance.delete(
`/notifications/${id}`
);


setNotifications(prev=>
prev.filter(
(item)=>item._id!==id
)
);


}
catch(error){

console.log(error);

}

};


return(


<div className="
text-white
space-y-6
">



<h1 className="
text-4xl
font-bold
">

Notifications 🔔

</h1>




{

notifications.length===0 ?


<div className="
bg-white/10
p-8
rounded-3xl
text-center
">

No Notifications

</div>


:


notifications.map(item=>(


<div

key={item._id}

className={`

bg-white/10
backdrop-blur-xl
p-5
rounded-2xl
border

${
item.isRead
?
"opacity-60 border-white/10"
:
"border-blue-400"
}

`}

>


<h2 className="
font-bold
text-xl
">

{item.title}

</h2>


<p className="
text-gray-300
mt-2
">

{item.message}

</p>

<div className="
flex
gap-3
mt-4
">


{

!item.isRead &&

<button

onClick={()=>
markRead(item._id)
}

className="
bg-green-600
px-5
py-2
rounded-xl
hover:bg-green-700
"

>

Mark as Read

</button>

}




<button

onClick={()=>
deleteNotification(item._id)
}

className="
bg-red-600
px-5
py-2
rounded-xl
hover:bg-red-700
"

>

Delete

</button>



</div>


<p className="
text-sm
text-gray-400
mt-3
">

{
new Date(
item.createdAt
)
.toLocaleString()

}

</p>



</div>


))


}



</div>


)

}


export default Notifications;