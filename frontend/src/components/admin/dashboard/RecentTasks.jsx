const RecentTasks = ({ tasks }) => {
  if (!tasks?.length) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      
      <h2 className="text-white text-xl font-bold mb-4">
        Recent Tasks
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="text-gray-300 border-b border-white/20">
              <th className="text-left p-2">Task</th>
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Assigned To</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-white/10">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.project?.projectName}</td>
                <td className="p-2">{task.assignedTo?.name}</td>

                <td className="p-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/30">
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default RecentTasks;