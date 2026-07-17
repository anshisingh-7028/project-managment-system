import React from "react";

const TeamTable = ({ members }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      rounded-3xl
      border
      border-white/20
      shadow-2xl
      p-6
      "
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        👥 Team Members
      </h2>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full text-white">

          <thead className="bg-blue-700">

            <tr>

              <th className="p-4">Employee</th>

              <th className="p-4">Email</th>

              <th className="p-4">Total Tasks</th>

              <th className="p-4">Completed</th>

              <th className="p-4">Pending</th>

              <th className="p-4">Progress</th>

            </tr>

          </thead>

          <tbody>

            {members.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-300"
                >

                  No Team Members Found

                </td>

              </tr>

            ) : (

              members.map((member) => (

                <tr
                  key={member._id}
                  className="
                  border-b
                  border-white/10
                  hover:bg-white/10
                  transition
                  text-center
                  "
                >

                  <td className="p-4 font-semibold">
                    {member.name}
                  </td>

                  <td className="p-4">
                    {member.email}
                  </td>

                  <td className="p-4">
                    {member.totalTasks}
                  </td>

                  <td className="p-4 text-green-400 font-bold">
                    {member.completedTasks}
                  </td>

                  <td className="p-4 text-yellow-400 font-bold">
                    {member.pendingTasks}
                  </td>

                  <td className="p-4">

                    <div className="w-40 mx-auto">

                      <div className="w-full h-3 bg-gray-700 rounded-full">

                        <div
                          className={`
                          h-3
                          rounded-full
                          ${getProgressColor(member.progress)}
                          `}
                          style={{
                            width: `${member.progress}%`,
                          }}
                        />

                      </div>

                      <p className="mt-2 text-sm">
                        {member.progress}%
                      </p>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Mobile View */}

      <div className="lg:hidden space-y-5">

        {members.length === 0 ? (

          <div className="text-center py-10 text-gray-300">

            No Team Members Found

          </div>

        ) : (

          members.map((member) => (

            <div
              key={member._id}
              className="
              bg-white/10
              border
              border-white/20
              rounded-2xl
              p-5
              "
            >

              <h2 className="text-xl font-bold">
                {member.name}
              </h2>

              <p className="text-gray-300 mt-2">
                {member.email}
              </p>

              <div className="grid grid-cols-3 gap-3 mt-5 text-center">

                <div>

                  <h3 className="text-xl font-bold">
                    {member.totalTasks}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    Total
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-green-400">
                    {member.completedTasks}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    Completed
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-yellow-400">
                    {member.pendingTasks}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    Pending
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <div className="w-full h-3 bg-gray-700 rounded-full">

                  <div
                    className={`
                    h-3
                    rounded-full
                    ${getProgressColor(member.progress)}
                    `}
                    style={{
                      width: `${member.progress}%`,
                    }}
                  />

                </div>

                <p className="text-center mt-2">
                  {member.progress}% Completed
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default TeamTable;