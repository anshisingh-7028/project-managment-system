const ActivityFeed = ({ tasks }) => {
  if (!tasks?.length) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      
      <h2 className="text-white text-xl font-bold mb-4">
        Activity Feed
      </h2>

      <div className="space-y-4">

        {tasks.slice(0, 5).map((task) => (
          <div
            key={task._id}
            className="flex items-start gap-3"
          >

            <div className="w-2 h-2 mt-2 rounded-full bg-green-400"></div>

            <div>
              <p className="text-white text-sm">
                Task "{task.title}" updated
              </p>

              <p className="text-gray-400 text-xs">
                {task.status} • {task.project?.projectName}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityFeed;