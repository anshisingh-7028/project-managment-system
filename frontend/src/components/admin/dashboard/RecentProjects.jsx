const RecentProjects = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      
      <h2 className="text-white text-xl font-bold mb-4">
        Recent Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between">
              <h3 className="text-white font-semibold">
                {project.projectName}
              </h3>

              <span className="text-sm text-gray-300">
                {project.status}
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-1">
              Manager: {project.manager?.name}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentProjects;