import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

import {
  FaArrowLeft,
  FaUserTie,
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";


const EmployeeProjectDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);


  // FETCH PROJECT DETAILS

  const fetchProjectDetails = async () => {

    try {

      const res = await axiosInstance.get(
        `/projects/${id}`
      );

      setProjectData(res.data);

    } catch (error) {

      console.log(
        "PROJECT DETAILS ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchProjectDetails();

  }, [id]);



  if(loading){

    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      text-white
      ">

        <FaSpinner className="
        animate-spin
        text-5xl
        text-blue-400
        "/>

      </div>

    );

  }



  if(!projectData){

    return (

      <div className="
      text-white
      text-center
      text-3xl
      mt-20
      ">

        Project Not Found

      </div>

    );

  }



  const {
    project,
    tasks,
    stats
  } = projectData;



  return (

    <div className="
    min-h-screen
    text-white
    ">



      {/* TOP HEADER */}

      <div className="
      bg-gradient-to-r
      from-blue-700
      via-indigo-700
      to-purple-700
      rounded-3xl
      p-6
      md:p-8
      shadow-2xl
      mb-8
      ">


        <button
        onClick={()=>navigate(-1)}
        className="
        flex
        items-center
        gap-2
        bg-white/20
        px-4
        py-2
        rounded-xl
        mb-6
        hover:bg-white/30
        "
        >

          <FaArrowLeft/>
          Back

        </button>



        <h1 className="
        text-3xl
        md:text-5xl
        font-bold
        ">

          {project.projectName}

        </h1>


        <p className="
        text-blue-100
        mt-3
        text-lg
        ">

          {project.description}

        </p>


      </div>





      {/* STATS */}

      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-5
      mb-8
      ">


        <StatCard
        title="Total Tasks"
        value={stats.totalTasks}
        icon={<FaTasks/>}
        />


        <StatCard
        title="Completed"
        value={stats.completedTasks}
        icon={<FaCheckCircle/>}
        />


        <StatCard
        title="Pending"
        value={stats.pendingTasks}
        icon={<FaClock/>}
        />


        <StatCard
        title="Progress"
        value={`${stats.progress}%`}
        icon={<FaSpinner/>}
        />


      </div>





      {/* PROJECT INFO */}

      <div className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
      mb-8
      ">


        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">
          Project Information
        </h2>



        <div className="
        grid
        md:grid-cols-2
        gap-6
        ">


          <Info
          icon={<FaUserTie/>}
          title="Manager"
          value={
            project.manager?.name ||
            "Not Assigned"
          }
          />


          <Info
          icon={<FaCalendarAlt/>}
          title="Deadline"
          value={
            project.endDate
            ?
            new Date(
              project.endDate
            ).toLocaleDateString()
            :
            "No Deadline"
          }
          />


          <Info
          icon={<FaClock/>}
          title="Status"
          value={project.status}
          />


          <Info
          icon={<FaTasks/>}
          title="Priority"
          value={project.priority}
          />


        </div>


      </div>





      {/* TASK LIST */}


      <div className="
      bg-white/10
      backdrop-blur-xl
      rounded-3xl
      p-6
      ">


        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">

          Project Tasks

        </h2>



        <div className="
        space-y-4
        ">


        {
          tasks.length===0 ?

          (

            <p className="text-gray-400">
              No tasks assigned
            </p>

          )

          :

          (

            tasks.map((task)=>(

              <div
              key={task._id}
              className="
              bg-white/10
              rounded-xl
              p-5
              flex
              flex-col
              md:flex-row
              justify-between
              gap-4
              "
              >


                <div>

                  <h3 className="
                  text-xl
                  font-semibold
                  ">
                    {task.title}
                  </h3>


                  <p className="
                  text-gray-300
                  mt-2
                  ">
                    {task.description}
                  </p>


                </div>



                <span className="
                bg-blue-600
                px-4
                py-2
                rounded-full
                h-fit
                ">

                  {task.status}

                </span>


              </div>

            ))

          )
        }


        </div>


      </div>



    </div>

  );

};





// STAT CARD

const StatCard = ({
  title,
  value,
  icon
})=>{


return (

<div className="
bg-white/10
backdrop-blur-xl
rounded-2xl
p-5
flex
justify-between
items-center
border
border-white/10
">


<div>

<p className="
text-gray-300
">
{title}
</p>


<h2 className="
text-3xl
font-bold
mt-2
">
{value}
</h2>


</div>


<div className="
text-4xl
text-blue-400
">

{icon}

</div>


</div>

);

};





const Info = ({
icon,
title,
value
})=>{


return (

<div className="
flex
items-center
gap-4
bg-white/5
p-4
rounded-xl
">


<div className="
text-blue-400
text-2xl
">

{icon}

</div>


<div>

<p className="
text-gray-400
text-sm
">

{title}

</p>


<p className="
font-semibold
">

{value}

</p>


</div>


</div>

);

};



export default EmployeeProjectDetails;