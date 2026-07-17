const WelcomeBanner = () => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (

    <div
      className="
      bg-gradient-to-r
      from-blue-600/40
      via-indigo-500/30
      to-purple-600/40
      backdrop-blur-xl
      rounded-3xl
      p-8
      border
      border-white/20
      shadow-xl
      "
    >

      <h1 className="text-4xl font-bold text-white">

        {greeting} 👋

      </h1>

      <p className="text-gray-300 mt-2">

        Welcome back to your Project Management Dashboard

      </p>

    </div>

  );
};

export default WelcomeBanner;