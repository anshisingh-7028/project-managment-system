import { Outlet } from "react-router-dom";
import { useState } from "react";

import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerNavbar from "../components/manager/ManagerNavbar";
import { FaBars } from "react-icons/fa";


const ManagerLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="
    min-h-screen
    flex
    bg-black
    ">


      {/* SIDEBAR */}

      <ManagerSidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

      />



      {/* MAIN CONTENT */}

      <div className="
      flex-1
      lg:ml-64
      min-h-screen
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-purple-900
      "
      >


        {/* MOBILE HEADER */}

        <div className="
        lg:hidden
        flex
        items-center
        justify-between
        p-4
        bg-slate-950
        text-white
        "
        >

          <button

          onClick={() => setSidebarOpen(true)}

          className="
          bg-blue-600
          p-3
          rounded-xl
          "
          >

            <FaBars/>

          </button>


          <h1 className="
          text-xl
          font-bold
          ">
            Manager Panel
          </h1>


        </div>



        {/* PAGE CONTENT */}

        <div className="
        p-4
        md:p-6
        "
        >

          <Outlet/>

        </div>



      </div>


    </div>

  );

};


export default ManagerLayout;