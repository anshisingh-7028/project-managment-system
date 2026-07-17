import React from "react";

const CreateProjectForm = ({
  form,
  setForm,
  handleCreate,
  managers,
  employees,
}) => {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      shadow-2xl
      p-6
      lg:p-8
      mb-10
      "
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        🚀 Create New Project
      </h2>

      <form
        onSubmit={handleCreate}
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
      >
        {/* Project Name */}

        <div>
          <label className="text-white block mb-2">
            Project Name
          </label>

          <input
            type="text"
            placeholder="Enter Project Name"
            value={form.projectName}
            onChange={(e) =>
              setForm({
                ...form,
                projectName: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            placeholder-gray-300
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* Manager */}

        <div>
          <label className="text-white block mb-2">
            Project Manager
          </label>

          <select
            value={form.manager}
            onChange={(e) =>
              setForm({
                ...form,
                manager: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          >
            <option value="">Select Manager</option>

            {managers.map((manager) => (
              <option
                key={manager._id}
                value={manager._id}
                className="text-black"
              >
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}

        <div>
          <label className="text-white block mb-2">
            Priority
          </label>

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          >
            <option className="text-black">
              High
            </option>

            <option className="text-black">
              Medium
            </option>

            <option className="text-black">
              Low
            </option>
          </select>
        </div>

        {/* Status */}

        <div>
          <label className="text-white block mb-2">
            Status
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          >
            <option className="text-black">
              Not Started
            </option>

            <option className="text-black">
              In Progress
            </option>

            <option className="text-black">
              Completed
            </option>

            <option className="text-black">
              On Hold
            </option>
          </select>
        </div>

        {/* Start Date */}

        <div>
          <label className="text-white block mb-2">
            Start Date
          </label>

          <input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm({
                ...form,
                startDate: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* End Date */}

        <div>
          <label className="text-white block mb-2">
            End Date
          </label>

          <input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              setForm({
                ...form,
                endDate: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* Team Members */}

<div className="md:col-span-2 xl:col-span-3">
  <label className="text-white block mb-3 text-lg font-semibold">
    Team Members
  </label>

  <div
    className="
    bg-white/10
    border
    border-white/20
    rounded-2xl
    p-5
    max-h-72
    overflow-y-auto
    "
  >
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">

      {employees.length === 0 ? (
        <p className="text-gray-300">
          No Employees Found
        </p>
      ) : (
        employees.map((emp) => (
          <label
            key={emp._id}
            className="
            flex
            items-center
            gap-3
            bg-white/5
            hover:bg-blue-500/20
            p-3
            rounded-xl
            cursor-pointer
            transition
            "
          >
            <input
              type="checkbox"
              checked={form.team.includes(emp._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setForm({
                    ...form,
                    team: [...form.team, emp._id],
                  });
                } else {
                  setForm({
                    ...form,
                    team: form.team.filter(
                      (id) => id !== emp._id
                    ),
                  });
                }
              }}
              className="w-5 h-5"
            />

            <div>
              <p className="text-white font-semibold">
                {emp.name}
              </p>

              <p className="text-gray-400 text-sm">
                {emp.email}
              </p>
            </div>
          </label>
        ))
      )}

    </div>
  </div>
</div>

        {/* Description */}

        <div className="md:col-span-2 xl:col-span-3">
          <label className="text-white block mb-2">
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Write Project Description..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            border
            border-white/20
            text-white
            placeholder-gray-300
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* Button */}

        <div className="md:col-span-2 xl:col-span-3">
          <button
            type="submit"
            className="
            w-full
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-700
            py-4
            rounded-xl
            text-xl
            font-bold
            text-white
            hover:scale-[1.02]
            duration-300
            shadow-xl
            "
          >
            🚀 Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;