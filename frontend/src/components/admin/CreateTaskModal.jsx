import { useEffect, useState } from "react";

import axiosInstance from "../../services/axiosInstance";

const CreateTaskModal = ({ setShowCreateModal, fetchTasks }) => {

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

fetchProjects();

fetchEmployees();

}, []);

const fetchProjects = async () => {

try {

const res = await axiosInstance.get("/projects");

setProjects(res.data);

} catch (err) {

console.log(err);

}

};

const fetchEmployees = async () => {

try {

const res = await axiosInstance.get("/users");

setEmployees(

res.data.filter((u) => u.role === "employee")

);

} catch (err) {

console.log(err);

}

};

const handleCreate = async (e) => {

e.preventDefault();

try {

await axiosInstance.post("/tasks", form);

alert("Task Created Successfully");

fetchTasks();

setShowCreateModal(false);

} catch (err) {

alert(err.response?.data?.message || "Create Failed");

}

};

return (

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

<div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

<h2 className="text-3xl font-bold text-center text-blue-700 mb-8">

🚀 Create New Task

</h2>

<form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-5">

<input

type="text"

placeholder="Task Title"

value={form.title}

onChange={(e) => setForm({ ...form, title: e.target.value })}

className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"

/>

<select

value={form.project}

onChange={(e) => setForm({ ...form, project: e.target.value })}

className="border rounded-xl p-4"

>

<option value="">Select Project</option>

{projects.map((p) => (

<option key={p._id} value={p._id}>

{p.projectName}

</option>

))}

</select>

<select

value={form.assignedTo}

onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}

className="border rounded-xl p-4"

>

<option value="">Assign Employee</option>

{employees.map((emp) => (

<option key={emp._id} value={emp._id}>

{emp.name}

</option>

))}

</select>

<select

value={form.priority}

onChange={(e) => setForm({ ...form, priority: e.target.value })}

className="border rounded-xl p-4"

>

<option>High</option>

<option>Medium</option>

<option>Low</option>

</select>

<select

value={form.status}

onChange={(e) => setForm({ ...form, status: e.target.value })}

className="border rounded-xl p-4"

>

<option>To Do</option>

<option>In Progress</option>

<option>Completed</option>
<option>On Hold</option>

</select>

<input

type="date"

value={form.startDate}

onChange={(e) => setForm({ ...form, startDate: e.target.value })}

className="border rounded-xl p-4"

/>

<input

type="date"

value={form.dueDate}

onChange={(e) => setForm({ ...form, dueDate: e.target.value })}

className="border rounded-xl p-4"

/>

<textarea

rows="5"

placeholder="Task Description"

value={form.description}

onChange={(e) => setForm({ ...form, description: e.target.value })}

className="md:col-span-2 border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"

/>

<div className="md:col-span-2 flex justify-end gap-4 mt-4">

<button

type="button"

onClick={() => setShowCreateModal(false)}

className="px-6 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600"

>

Cancel

</button>

<button

type="submit"

className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"

>

Create Task

</button>

</div>

</form>

</div>

</div>

);

};

export default CreateTaskModal;