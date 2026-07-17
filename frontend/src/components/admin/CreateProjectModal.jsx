import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import CreateProjectForm from "./CreateProjectForm";

const CreateProjectModal = ({
  setShowCreateModal,
  fetchProjects,
}) => {
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
  projectName: "",
  description: "",
  manager: "",
  team: [],
  priority: "Medium",
  status: "Not Started",
  startDate: "",
  endDate: "",
});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");

    setManagers(
      res.data.filter((user) => user.role === "manager")
    );

    setEmployees(
      res.data.filter((user) => user.role === "employee")
    );

  } catch (err) {
    console.log(err);
  }
};

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/projects",
        form
      );

      alert(res.data.message || "Project Created");

      fetchProjects();

      setShowCreateModal(false);

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Project creation failed"
      );
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      justify-center
      items-center
      z-50
      p-4
      overflow-y-auto
      "
    >
      <div
        className="
        w-full
        max-w-6xl
        max-h-[95vh]
        overflow-y-auto
        "
      >
        <CreateProjectForm
          form={form}
          setForm={setForm}
          handleCreate={handleCreate}
          managers={managers}
           employees={employees}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowCreateModal(false)}
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;