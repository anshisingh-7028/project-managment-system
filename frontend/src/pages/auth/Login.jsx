
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user",JSON.stringify(res.data.user)
);

const role = res.data.user.role;

if (role === "admin") {
  navigate("/admin/dashboard");
} else if (role === "manager") {
  navigate("/manager/dashboard");
} else {
  navigate("/employee/dashboard");
}


  } catch (error) {
    alert(
      error.response?.data?.message
    );
  }
};

  return (
    <div
      className="
      min-h-screen
      bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')]
      bg-cover
      bg-center
      flex
      justify-center
      items-center
      "
    >

      <div
        className="
        w-[400px]
        bg-white/10
        backdrop-blur-lg
        p-8
        rounded-2xl
        border
        border-white/20
        shadow-2xl
        "
      >

        <h1
          className="
          text-white
          text-3xl
          font-bold
          text-center
          mb-6
          "
        >
          Login
        </h1>
        <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
           value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
          className="
          w-full
          p-3
          rounded-lg
          mb-4
          outline-none
          "
        />

        <div className="relative mb-4">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
     value={password}
  onChange={(e) =>
    setPassword(
      e.target.value
    )
  }
    className="
      w-full
      p-3
      rounded-lg
      outline-none
      pr-12
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-600
    "
  >
    {showPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </button>
</div>


<div className="flex justify-end mb-4">
  <Link
    to="/forgot-password"
    className="
      text-white
      hover:text-yellow-300
      text-sm
    "
  >
    Forgot Password?
  </Link>
</div>

        <button
         type="submit"
          className="
          w-full
          bg-blue-600
          text-white
          p-3
          rounded-lg
          hover:bg-blue-700
          "
        >
          Login
        </button>
        </form>

        <p
          className="
          text-white
          mt-4
          text-center
          "
        >
          Don't have account?

          <Link
            to="/register"
            className="
            ml-2
            text-yellow-300
            "
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;