import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add User",
      color: "bg-blue-600",
      onClick: () => navigate("/admin/users"),
    },
    {
      label: "Create Project",
      color: "bg-green-600",
      onClick: () => navigate("/admin/projects"),
    },
    {
      label: "Assign Task",
      color: "bg-yellow-500",
      onClick: () => navigate("/admin/tasks"),
    },
    {
      label: "Reports",
      color: "bg-purple-600",
      onClick: () => navigate("/admin/reports"),
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">

      <h2 className="text-white text-xl font-bold mb-4">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-xl hover:scale-105 transition`}
          >
            {action.label}
          </button>
        ))}

      </div>

    </div>
  );
};

export default QuickActions;