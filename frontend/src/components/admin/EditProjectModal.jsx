import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const EditProjectModal = ({
  project,
  setShowModal,
  fetchProjects,
}) => {

  if (!project) return null;

  const [form, setForm] = useState({
    projectName: project.projectName || "",
    description: project.description || "",
    manager: project.manager?._id || "",
    priority: project.priority || "Medium",
    status: project.status || "Not Started",
    startDate: project.startDate
      ? project.startDate.slice(0, 10)
      : "",
    endDate: project.endDate
      ? project.endDate.slice(0, 10)
      : "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await axiosInstance.put(
        `/projects/${project._id}`,
        form
      );

      alert("Project Updated Successfully");

      fetchProjects();

      setShowModal(false);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );

    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      flex
      justify-center
      items-center
      z-50
      p-4
      "
    >

      <div
        className="
        w-full
        max-w-3xl
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
        max-h-[90vh]
        overflow-y-auto
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-center
          text-blue-700
          mb-8
          "
        >
          ✏ Edit Project
        </h2>

        <form
          onSubmit={handleUpdate}
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          "
        >

          {/* Project Name */}

          <input
            type="text"
            placeholder="Project Name"
            value={form.projectName}
            onChange={(e)=>
              setForm({
                ...form,
                projectName:e.target.value
              })
            }
            className="
            border
            rounded-xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          {/* Priority */}

          <select
            value={form.priority}
            onChange={(e)=>
              setForm({
                ...form,
                priority:e.target.value
              })
            }
            className="
            border
            rounded-xl
            p-4
            outline-none
            "
          >

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

          {/* Status */}

          <select
            value={form.status}
            onChange={(e)=>
              setForm({
                ...form,
                status:e.target.value
              })
            }
            className="
            border
            rounded-xl
            p-4
            outline-none
            "
          >

            <option value="Not Started">
              Not Started
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="On Hold">
              On Hold
            </option>

          </select>

          {/* Start Date */}

          <input
            type="date"
            value={form.startDate}
            onChange={(e)=>
              setForm({
                ...form,
                startDate:e.target.value
              })
            }
            className="
            border
            rounded-xl
            p-4
            "
          />

          {/* End Date */}

          <input
            type="date"
            value={form.endDate}
            onChange={(e)=>
              setForm({
                ...form,
                endDate:e.target.value
              })
            }
            className="
            border
            rounded-xl
            p-4
            "
          />

          {/* Description */}

          <textarea
            rows="5"
            placeholder="Project Description"
            value={form.description}
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value
              })
            }
            className="
            md:col-span-2
            border
            rounded-xl
            p-4
            resize-none
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          <div
            className="
            md:col-span-2
            flex
            justify-end
            gap-4
            mt-4
            "
          >

            <button
              type="button"
              onClick={()=>
                setShowModal(false)
              }
              className="
              px-6
              py-3
              rounded-xl
              bg-gray-500
              text-white
              hover:bg-gray-600
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
              px-6
              py-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              "
            >
              Update Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProjectModal;