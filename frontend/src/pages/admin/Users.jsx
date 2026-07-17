import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditUserModal from "../../components/admin/EditUserModal";
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";



const Users = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [search, setSearch] = useState("");

  // FETCH USERS
  const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");

    setUsers(res.data || []);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE USER
  const handleCreate = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.post("/users", form);

    alert(res.data.message || "User Created");

    setForm({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });

    fetchUsers();
  } catch (err) {
  alert(
    err.response?.data?.message ||
    err.message ||
    "Error creating user"
  );
  }
};
  // DELETE USER
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };
const filteredUsers = users.filter((user) => {
  return (
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    (user.email || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
});
  
return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-black overflow-x-hidden">

    {/* Sidebar (FIXED like Tasks page) */}
    <AdminSidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    {/* Right Content */}
    <div
      className="flex-1
lg:ml-64
min-h-screen
w-full
bg-cover
bg-center
relative
        
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
      }}
    >

      {/* Dark overlay */}
      <div className="min-h-screen bg-black/70">

        {/* MOBILE HEADER (same as Tasks page) */}
        <div className="lg:hidden flex justify-between items-center p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white p-3 rounded-xl"
          >
            ☰
          </button>

          <h2 className="text-white text-xl font-bold">
            Users
          </h2>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">

          {/* PAGE HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl
sm:text-4xl
lg:text-5xl
font-extrabold
text-white">
              👥 Users Management
            </h1>
            <p className="text-gray-300 mt-3 text-lg">
              Create, manage and organize managers & employees
            </p>
          </div>

          {/* CREATE USER CARD */}

<div
className="
relative
overflow-hidden
bg-gradient-to-br
from-white/20
via-white/10
to-white/5
backdrop-blur-2xl
rounded-3xl
border
border-white/20
shadow-2xl
p-5
sm:p-8
lg:p-10
mb-10
"
>

{/* Glow Effect */}

<div
className="
absolute
- top-20
-right-20
w-72
h-72
bg-blue-500/30
rounded-full
blur-3xl
"
/>


<div className="relative z-10">


<div className="flex items-center gap-4 mb-8">


<div
className="
w-14
h-14
rounded-2xl
bg-gradient-to-r
from-blue-600
to-purple-700
flex
items-center
justify-center
text-3xl
shadow-lg
"
>
👤
</div>


<div>

<h2
className="
text-3xl
font-extrabold
text-white
"
>
Create New User
</h2>


<p className="text-gray-300 mt-1">
Add manager and employee accounts
</p>


</div>


</div>



<form
onSubmit={handleCreate}
className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"
>


{/* NAME */}

<div>

<label className="text-white text-sm mb-2 block">
Full Name
</label>


<div className="relative">

<span
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-300
"
>
👤
</span>


<input

type="text"

placeholder="Enter full name"

value={form.name}

onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}

className="
w-full
pl-12
pr-4
py-4
rounded-2xl
bg-black/20
border
border-white/20
text-white
placeholder-gray-400
outline-none
focus:ring-2
focus:ring-blue-500
transition
"
/>


</div>

</div>





{/* EMAIL */}

<div>

<label className="text-white text-sm mb-2 block">
Email Address
</label>


<div className="relative">


<span
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-300
"
>
✉️
</span>


<input

type="email"

placeholder="Enter email"

value={form.email}

onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}

className="
w-full
pl-12
pr-4
py-4
rounded-2xl
bg-black/20
border
border-white/20
text-white
placeholder-gray-400
outline-none
focus:ring-2
focus:ring-blue-500
transition
"

/>


</div>

</div>





{/* PASSWORD */}

<div>

<label className="text-white text-sm mb-2 block">
Password
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

placeholder="Create password"

value={form.password}

onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}

className="
w-full
py-4
px-4
pr-12
rounded-2xl
bg-black/20
border
border-white/20
text-white
placeholder-gray-400
outline-none
focus:ring-2
focus:ring-blue-500
transition
"

/>



<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

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






{/* ROLE */}

<div>


<label className="text-white text-sm mb-2 block">
Select Role
</label>


<select

value={form.role}

onChange={(e)=>
setForm({
...form,
role:e.target.value
})
}

className="
w-full
py-4
px-4
rounded-2xl
bg-black/20
border
border-white/20
text-white
outline-none
focus:ring-2
focus:ring-purple-500
"

>


<option
value="manager"
className="text-black"
>
Manager
</option>


<option
value="employee"
className="text-black"
>
Employee
</option>


</select>


</div>





{/* BUTTON */}

<div className="md:col-span-2 xl:col-span-4">


<button

type="submit"

className="
w-full
py-4
rounded-2xl
bg-gradient-to-r
from-blue-600
via-indigo-600
to-purple-700
text-white
font-bold
text-lg
shadow-xl
hover:scale-[1.02]
hover:shadow-blue-500/40
transition
duration-300
"

>

🚀 Create Account

</button>


</div>



</form>


</div>


</div>

          

          {/* STATS + SEARCH */}
          <div className="flex
flex-col
xl:flex-row
justify-between
gap-6
mb-8">

            <div className="grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
w-full">

              <div className="bg-blue-600 p-6 rounded-2xl text-white">
                <h2>Total Users</h2>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>

              <div className="bg-green-600 p-6 rounded-2xl text-white">
                <h2>Managers</h2>
                <p className="text-3xl font-bold">
                  {users.filter(u => u.role === "manager").length}
                </p>
              </div>

              <div className="bg-purple-600 p-6 rounded-2xl text-white">
                <h2>Employees</h2>
                <p className="text-3xl font-bold">
                  {users.filter(u => u.role === "employee").length}
                </p>
              </div>

            </div>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full
lg:w-80
max-w-full
bg-white/20
text-white
px-4
py-3
rounded-xl
border
border-white/20"
            />

          </div>

          {/* TABLE */}
          <div className="bg-white/10
backdrop-blur-xl
rounded-3xl
border
border-white/20
overflow-x-auto
w-full">

            <table className="w-full
text-white
min-w-[700px]">
              <thead className="bg-blue-700">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="text-center hover:bg-white/10">

                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>

                    <td className="p-3
flex
justify-center
items-center
gap-3">
                       {user?.role === "admin" && (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-600 p-2 rounded-full"
                      >
                        <FaTrash />
                      </button>
                       )}
                      {user?.role === "admin" && (
                      <button
                        onClick={() => {
                          setEditUser(u);
                          setShowModal(true);
                        }}
                        className="bg-blue-600 p-2 rounded-full"
                      >
                        <FaEdit />
                      </button>
                      )}

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-10 text-gray-300">
                No Users Found
              </div>
            )}

          </div>

        </div>

        {/* MODAL */}
        {showModal && (
          <EditUserModal
            user={editUser}
            setShowModal={setShowModal}
            fetchUsers={fetchUsers}
          />
        )}

      </div>
    </div>
  </div>
);
  
};

export default Users;