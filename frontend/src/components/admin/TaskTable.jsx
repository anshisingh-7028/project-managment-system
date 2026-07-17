import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskTable = ({
  tasks,
  setEditTask,
  setShowModal,
  handleDelete,
}) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";

      case "In Progress":
        return "bg-blue-500";

      case "To Do":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-600";

      case "Medium":
        return "bg-orange-500";

      case "Low":
        return "bg-green-600";

      default:
        return "bg-gray-600";
    }
  };

  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      rounded-3xl
      border
      border-white/20
      shadow-2xl
      p-6
      "
    >

      <h2 className="text-3xl font-bold text-white mb-8">
        ✅ All Tasks
      </h2>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full text-white">

          <thead className="bg-blue-700">

            <tr>

              <th className="p-4">Task</th>

              <th className="p-4">Project</th>

              <th className="p-4">Employee</th>

              <th className="p-4">Priority</th>

              <th className="p-4">Status</th>

              <th className="p-4">Due Date</th>

              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {
              tasks.length===0 ?

              (

              <tr>

                <td
                colSpan="7"
                className="text-center py-10 text-gray-300"
                >

                  No Tasks Found

                </td>

              </tr>

              )

              :

              (

                tasks.map((task)=>(

                  <tr
                  key={task._id}
                  className="
                  border-b
                  border-white/10
                  hover:bg-white/10
                  duration-300
                  text-center
                  "
                  >

                    <td className="p-4 font-semibold">

                      {task.title}

                    </td>

                    <td className="p-4">

                      {task.project?.projectName || "N/A"}

                    </td>

                    <td className="p-4">

                      {task.assignedTo?.name || "N/A"}

                    </td>

                    <td className="p-4">

                      <span
                      className={`
                      ${getPriorityColor(task.priority)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      `}
                      >

                        {task.priority}

                      </span>

                    </td>

                    <td className="p-4">

                      <span
                      className={`
                      ${getStatusColor(task.status)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      `}
                      >

                        {task.status}

                      </span>

                    </td>

                    <td className="p-4">

                      {task.dueDate?.slice(0,10)}

                    </td>

                    <td className="p-4 flex justify-center gap-3">

                      <button

                      className="
                      bg-blue-600
                      hover:bg-blue-700
                      p-3
                      rounded-full
                      "

                      onClick={()=>{
                        setEditTask(task);
                        setShowModal(true);
                      }}

                      >

                        <FaEdit/>

                      </button>

                      <button

                      className="
                      bg-red-600
                      hover:bg-red-700
                      p-3
                      rounded-full
                      "

                      onClick={()=>
                      handleDelete(task._id)
                      }

                      >

                        <FaTrash/>

                      </button>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-5">

        {

          tasks.length===0 ?

          (

          <div className="text-center py-10 text-gray-300">

            No Tasks Found

          </div>

          )

          :

          (

            tasks.map((task)=>(

              <div

              key={task._id}

              className="
              bg-white/10
              border
              border-white/20
              rounded-2xl
              p-5
              "

              >

                <h2 className="text-xl font-bold text-white">

                  {task.title}

                </h2>

                <p className="text-gray-300 mt-2">

                  📁 {task.project?.projectName}

                </p>

                <p className="text-gray-300">

                  👤 {task.assignedTo?.name}

                </p>

                <p className="text-gray-300">

                  📅 {task.dueDate?.slice(0,10)}

                </p>

                <div className="flex gap-3 mt-4">

                  <span
                  className={`
                  ${getPriorityColor(task.priority)}
                  px-3
                  py-1
                  rounded-full
                  `}
                  >

                    {task.priority}

                  </span>

                  <span
                  className={`
                  ${getStatusColor(task.status)}
                  px-3
                  py-1
                  rounded-full
                  `}
                  >

                    {task.status}

                  </span>

                </div>

                <div className="flex gap-4 mt-5">

                  <button

                  className="
                  flex-1
                  bg-blue-600
                  py-3
                  rounded-xl
                  text-white
                  "

                  onClick={()=>{
                    setEditTask(task);
                    setShowModal(true);
                  }}

                  >

                    Edit

                  </button>

                  <button

                  className="
                  flex-1
                  bg-red-600
                  py-3
                  rounded-xl
                  text-white
                  "

                  onClick={()=>
                  handleDelete(task._id)
                  }

                  >

                    Delete

                  </button>

                </div>

              </div>

            ))

          )

        }

      </div>

    </div>
  );

};

export default TaskTable;