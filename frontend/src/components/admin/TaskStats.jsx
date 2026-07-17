import React from "react";

const TaskStats = ({ tasks }) => {

return (

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

{/* Total Tasks */}

<div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 shadow-xl">

<h3 className="text-white text-lg">Total Tasks</h3>

<h1 className="text-5xl font-bold text-white mt-3">

{tasks.length}

</h1>

</div>

{/* To Do */}

<div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-6 shadow-xl">

<h3 className="text-white text-lg">To Do</h3>

<h1 className="text-5xl font-bold text-white mt-3">

{tasks.filter(t => t.status === "To Do").length}

</h1>

</div>

{/* In Progress */}

<div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-6 shadow-xl">

<h3 className="text-white text-lg">In Progress</h3>

<h1 className="text-5xl font-bold text-white mt-3">

{tasks.filter(t => t.status === "In Progress").length}

</h1>

</div>

{/* Completed */}

<div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 shadow-xl">

<h3 className="text-white text-lg">Completed</h3>

<h1 className="text-5xl font-bold text-white mt-3">

{tasks.filter(t => t.status === "Completed").length}

</h1>

</div>

</div>

);

};

export default TaskStats;