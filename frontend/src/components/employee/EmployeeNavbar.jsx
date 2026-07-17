import { useState,useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [search, setSearch] = useState("");
  const [notificationCount,setNotificationCount]=useState(0);

  const today = new Date();

 const fetchNotificationCount = async()=>{

try{

const res =
await axiosInstance.get(
"/notifications"
);


const unreadCount =
res.data.filter(
(notification)=>notification.read === false
).length;


setNotificationCount(unreadCount);


}
catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchNotificationCount();

},[]);

  return (
    <header className=" bg-white/10 backdrop-blur-xl border-b border-white/10">

      <div className="flex items-center justify-between px-4 md:px-8 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <div>
            <h1 className="text-white text-xl md:text-3xl font-bold">
              Welcome,
              <span className="text-blue-400">
                {" "}
                {user?.name}
              </span>
              👋
            </h1>

            <p className="text-gray-300 text-sm">
              {today.toDateString()}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-white/10 rounded-xl px-3 py-2">

            <FaSearch className="text-gray-300" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-transparent outline-none ml-2 text-white placeholder:text-gray-400"
            />

          </div>

          {/* Notification */}
          <button
            onClick={() =>
              navigate("/employee/notifications")
            }
            className="relative bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <FaBell className="text-white text-xl" />

            {
notificationCount > 0 &&

<span
className="
absolute
-top-1
-right-1
h-5
w-5
bg-red-500
rounded-full
flex
items-center
justify-center
text-xs
text-white
"
>

{notificationCount}

</span>

}

          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2">

            <FaUserCircle className="text-4xl text-blue-400" />

            <div className="hidden md:block">

              <h3 className="text-white font-semibold">
                {user?.name}
              </h3>

              <p className="text-gray-400 text-sm">
                {user?.role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default EmployeeNavbar;