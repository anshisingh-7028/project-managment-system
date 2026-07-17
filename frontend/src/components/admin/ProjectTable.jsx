import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectTable = ({
  projects,
  setEditProject,
  setShowModal,
  handleDelete,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";

      case "In Progress":
        return "bg-blue-500";

      case "On Hold":
        return "bg-yellow-500";

      default:
        return "bg-red-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-600";

      case "Medium":
        return "bg-orange-500";

      default:
        return "bg-green-600";
    }
  };

  return (
    <div
      className="
w-full
bg-white/10
backdrop-blur-xl
rounded-3xl
border
border-white/20
shadow-2xl
p-3
sm:p-5
md:p-6
overflow-hidden
"
    >
      <h2
        className="text-xl
sm:text-2xl
md:text-3xl
font-bold
text-white
mb-6"
      >
        📁 All Projects
      </h2>

      {/* Desktop Table */}

      <div
        className="hidden
lg:block
overflow-x-auto
scrollbar-thin
w-full"
      >
        <table
          className="min-w-[1000px]
w-full
text-white"
        >
          <thead className="bg-blue-700">
            <tr>
              <th className="p-4">Project</th>

              <th className="p-4">Manager</th>

              <th className="p-4">Priority</th>

              <th className="p-4">Status</th>

              <th className="p-4">Start</th>

              <th className="p-4">End</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-300">
                  No Projects Found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="
                  border-b
                  border-white/10
                  hover:bg-white/10
                  duration-300
                  text-center
                  "
                >
                  <td className="p-4 font-semibold">{project.projectName}</td>

                  <td className="p-4">{project.manager?.name || "N/A"}</td>

                  <td className="p-4">
                    <span
                      className={`
                      ${getPriorityColor(project.priority)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      `}
                    >
                      {project.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                      ${getStatusColor(project.status)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      `}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="p-4">{project.startDate?.slice(0, 10)}</td>

                  <td className="p-4">{project.endDate?.slice(0, 10)}</td>

                  <td
                    className="p-4
flex
justify-center
gap-3
flex-wrap"
                  >
                    <button
                      className="
                      bg-blue-600
                      hover:bg-blue-700
                      p-3
                      rounded-full
                      "
                      onClick={() => {
                        setEditProject(project);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="
                      bg-red-600
                      hover:bg-red-700
                      p-3
                      rounded-full
                      "
                      onClick={() => handleDelete(project._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}

      <div
        className="lg:hidden
grid
grid-cols-1
sm:grid-cols-2
gap-5"
      >
        {projects.length === 0 ? (
          <div className="text-center text-gray-300 py-8">
            No Projects Found
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="
              bg-white/10
rounded-2xl
p-4
sm:p-5
border
border-white/20
hover:bg-white/20
transition
              "
            >
              <h2 className="text-xl font-bold text-white">
                {project.projectName}
              </h2>

              <p className="text-gray-300 mt-2">
                👨 Manager : {project.manager?.name || "N/A"}
              </p>

              <p className="text-gray-300">
                📅 Start : {project.startDate?.slice(0, 10)}
              </p>

              <p className="text-gray-300">
                🏁 End : {project.endDate?.slice(0, 10)}
              </p>

              <div className="flex gap-3 mt-4">
                <span
                  className={`
                  ${getPriorityColor(project.priority)}
                  px-3
                  py-1
                  rounded-full
                  text-white
                  `}
                >
                  {project.priority}
                </span>

                <span
                  className={`
                  ${getStatusColor(project.status)}
                  px-3
                  py-1
                  rounded-full
                  text-white
                  `}
                >
                  {project.status}
                </span>
              </div>

              <div
                className="flex
flex-col
sm:flex-row
gap-3
mt-5"
              >
                <button
                  className="
                  w-full
bg-blue-600
py-3
rounded-xl
text-white
hover:bg-blue-700
transition
                  "
                  onClick={() => {
                    setEditProject(project);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="
                  w-full
bg-red-600
py-3
rounded-xl
text-white
hover:bg-red-700
transition
                  "
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
