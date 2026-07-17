import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TaskStats from "../../components/admin/TaskStats";
import TaskTable from "../../components/admin/TaskTable";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import EditTaskModal from "../../components/admin/EditTaskModal";

import {
  FaBars,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

const Tasks = () => {
   const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editTask, setEditTask] = useState(null);


  const fetchTasks = async () => {

    try {

      const res = await axiosInstance.get("/tasks");

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchTasks();

  }, []);


  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase()) ||

    task.project?.projectName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    task.assignedTo?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  const handleDelete = async (id) => {

    try {

      await axiosInstance.delete(`/tasks/${id}`);

      alert("Task Deleted Successfully");

      fetchTasks();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };


  return (

<div className="min-h-screen flex">

<AdminSidebar
sidebarOpen={sidebarOpen}
setSidebarOpen={setSidebarOpen}
/>

<div
className="
flex-1
lg:ml-64
min-h-screen
bg-cover
bg-center
"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
}}
>

<div className="min-h-screen bg-black/70">

{/* Mobile Navbar */}

<div className="lg:hidden flex justify-between items-center p-4">

<button
onClick={() => setSidebarOpen(true)}
className="
bg-blue-600
text-white
p-3
rounded-xl
"
>

<FaBars />

</button>

<h2 className="text-white text-xl font-bold">

Tasks

</h2>

</div>


<div className="p-4 md:p-8">

{/* Heading */}

<div className="mb-10">

<h1 className="text-5xl font-extrabold text-white">

✅ Task Management

</h1>

<p className="text-gray-300 mt-3 text-lg">

Assign, Track and Manage Employee Tasks

</p>

</div>


{/* Stats */}

<TaskStats tasks={tasks} />


{/* Search + Button */}

<div
className="
flex
flex-col
lg:flex-row
justify-between
items-center
gap-5
mb-8
"
>

<div className="relative w-full lg:w-96">

<FaSearch
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-white
"
/>

<input
type="text"
placeholder="Search Task..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
bg-white/20
backdrop-blur-xl
text-white
placeholder-gray-300
border
border-white/20
rounded-xl
pl-12
pr-5
py-4
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

</div>

{["admin","manager"].includes(user.role) && (
<button

onClick={()=>setShowCreateModal(true)}

className="
bg-gradient-to-r
from-blue-600
to-purple-700
text-white
font-bold
px-8
py-4
rounded-xl
hover:scale-105
duration-300
flex
items-center
gap-3
"
>

<FaPlus />

Create Task

</button>
)}

</div>


{/* Table */}

<TaskTable

tasks={filteredTasks}

setEditTask={setEditTask}

setShowModal={setShowEditModal}

handleDelete={handleDelete}

/>

</div>

</div>

</div>


{
showCreateModal && (

<CreateTaskModal

setShowCreateModal={setShowCreateModal}

fetchTasks={fetchTasks}

/>

)
}


{
showEditModal && (

<EditTaskModal

task={editTask}

setShowModal={setShowEditModal}

fetchTasks={fetchTasks}

/>

)
}

</div>

  );

};

export default Tasks;