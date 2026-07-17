const UpcomingDeadlines = ({ tasks }) => {
  if (!tasks?.length) return null;

  const today = new Date();

  const upcoming = tasks
    .filter((t) => t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">

      <h2 className="text-white text-xl font-bold mb-4">
        📅 Upcoming Deadlines
      </h2>

      <div className="space-y-4">

        {upcoming.map((task) => {
          const due = new Date(task.dueDate);
          const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

          return (
            <div
              key={task._id}
              className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div>
                <p className="text-white font-semibold">
                  {task.title}
                </p>

                <p className="text-gray-400 text-sm">
                  {task.project?.projectName}
                </p>
              </div>

              <div
                className={`text-sm px-3 py-1 rounded-full ${
                  diffDays <= 1
                    ? "bg-red-500/30 text-red-300"
                    : diffDays <= 3
                    ? "bg-yellow-500/30 text-yellow-300"
                    : "bg-green-500/30 text-green-300"
                }`}
              >
                {diffDays} days left
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default UpcomingDeadlines;