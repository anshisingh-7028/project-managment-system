
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value || 0;

    const interval = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return <span>{count}</span>;
};
const StatsCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
}) => {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-6
      shadow-xl
      hover:scale-105
      hover:shadow-blue-500/30
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-gray-300 text-sm">
            {title}
          </h3>
          <h1 className="text-white text-4xl font-bold mt-2">
             <AnimatedNumber value={value} />
              </h1>

         

          <p className="text-gray-400 mt-3 text-sm">
            {subtitle}
          </p>

        </div>

        <div
          className={`
          h-16
          w-16
          rounded-2xl
          flex
          items-center
          justify-center
          text-3xl
          ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatsCard;