import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../services/axiosInstance";

const Register = () => {
const navigate = useNavigate();
const [showPassword, setShowPassword] =useState(false);
const [showConfirmPassword,setShowConfirmPassword] =useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await axiosInstance.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    alert("Registration Successful");

    navigate("/login");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

  
  return (
    <div
      className="
      min-h-screen
      bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')]
      bg-cover
      bg-center
      flex
      justify-center
      items-center
      "
    >

      <div
        className="
        w-[450px]
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
          Register
        </h1>

        <form onSubmit={handleRegister}>
 <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  className="
  w-full
  p-3
  rounded-lg
  mb-4
  "
/>
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
  "
/> 
        

        <div className="relative mb-4">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
    className="
      w-full
      p-3
      rounded-lg
      pr-12
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
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

<div className="relative mb-4">

  <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirm Password"
     value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(
      e.target.value
    )
  }
    className="
      w-full
      p-3
      rounded-lg
      pr-12
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-600
    "
  >
    {showConfirmPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </button>

</div>

        
 <button
    type="submit"
    className="
      w-full
      bg-green-600
      text-white
      p-3
      rounded-lg
      hover:bg-green-700
      cursor-pointer
    "
  >
    Register
  </button>

</form>
        
         
        

        <p
          className="
          text-white
          mt-4
          text-center
          "
        >
          Already have account?

          <Link
            to="/login"
            className="
            ml-2
            text-yellow-300
            "
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;