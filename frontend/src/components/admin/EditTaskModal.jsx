import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const EditTaskModal = ({
  task,
  setShowModal,
  fetchTasks,
}) => {

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "Medium",
    status: "To Do",
    startDate: "",
    dueDate: "",
  });

  useEffect(() => {

    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        project: task.project?._id || "",
        assignedTo: task.assignedTo?._id || "",
        priority: task.priority || "Medium",
        status: task.status || "To Do",
        startDate: task.startDate?.slice(0,10) || "",
        dueDate: task.dueDate?.slice(0,10) || "",
      });
    }

    fetchProjects();
    fetchEmployees();

  }, [task]);

  const fetchProjects = async () => {
    const res = await axiosInstance.get("/projects");
    setProjects(res.data);
  };

  const fetchEmployees = async () => {
    const res = await axiosInstance.get("/users");

    setEmployees(
      res.data.filter(
        (u)=>u.role==="employee"
      )
    );
  };

  const handleUpdate = async(e)=>{
    e.preventDefault();

    try{

      await axiosInstance.put(
        `/tasks/${task._id}`,
        form
      );

      alert("Task Updated Successfully");

      fetchTasks();

      setShowModal(false);

    }catch(err){

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );

    }
  };

  return (

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

<div className="bg-white rounded-3xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">

<h2 className="text-3xl font-bold text-center text-blue-700 mb-8">

✏ Edit Task

</h2>

<form
onSubmit={handleUpdate}
className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

<input
type="text"
placeholder="Task Title"
value={form.title}
onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}
className="border rounded-xl p-4"
/>

<select
value={form.project}
onChange={(e)=>
setForm({
...form,
project:e.target.value
})
}
className="border rounded-xl p-4"
>

<option value="">

Select Project

</option>

{
projects.map((project)=>(

<option
key={project._id}
value={project._id}
>

{project.projectName}

</option>

))
}

</select>

<select
value={form.assignedTo}
onChange={(e)=>
setForm({
...form,
assignedTo:e.target.value
})
}
className="border rounded-xl p-4"
>

<option value="">

Assign Employee

</option>

{
employees.map((emp)=>(

<option
key={emp._id}
value={emp._id}
>

{emp.name}

</option>

))
}

</select>

<select
value={form.priority}
onChange={(e)=>
setForm({
...form,
priority:e.target.value
})
}
className="border rounded-xl p-4"
>

<option>High</option>
<option>Medium</option>
<option>Low</option>

</select>

<select
value={form.status}
onChange={(e)=>
setForm({
...form,
status:e.target.value
})
}
className="border rounded-xl p-4"
>

<option>To Do</option>
<option>In Progress</option>
<option>Completed</option>

</select>

<input
type="date"
value={form.startDate}
onChange={(e)=>
setForm({
...form,
startDate:e.target.value
})
}
className="border rounded-xl p-4"
/>

<input
type="date"
value={form.dueDate}
onChange={(e)=>
setForm({
...form,
dueDate:e.target.value
})
}
className="border rounded-xl p-4"
/>

<textarea
rows="5"
placeholder="Description"
value={form.description}
onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}
className="md:col-span-2 border rounded-xl p-4"
/>

<div className="md:col-span-2 flex justify-end gap-4">

<button
type="button"
onClick={()=>
setShowModal(false)
}
className="bg-gray-500 text-white px-6 py-3 rounded-xl"
>

Cancel

</button>

<button
type="submit"
className="bg-blue-600 text-white px-6 py-3 rounded-xl"
>

Update Task

</button>

</div>

</form>

</div>

</div>

  );

};

export default EditTaskModal;