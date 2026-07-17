const ProjectStats = ({ projects }) => {
  const total = projects.length;

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const progress = projects.filter(
    (p) => p.status === "In Progress"
  ).length;

  const pending = projects.filter(
    (p) => p.status === "Not Started"
  ).length;

  const cards = [
    {
      title: "Total Projects",
      value: total,
      color: "from-blue-600 to-cyan-500",
      icon: "📁",
    },
    {
      title: "Completed",
      value: completed,
      color: "from-green-600 to-emerald-500",
      icon: "✅",
    },
    {
      title: "In Progress",
      value: progress,
      color: "from-yellow-500 to-orange-500",
      icon: "🚀",
    },
    {
      title: "Pending",
      value: pending,
      color: "from-red-600 to-pink-600",
      icon: "⏳",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color}
          rounded-3xl
          p-6
          shadow-2xl
          hover:scale-105
          duration-300`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/90">
                {card.title}
              </p>

              <h1 className="text-5xl font-bold text-white mt-3">
                {card.value}
              </h1>
            </div>

            <div className="text-5xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;