import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import axiosInstance from "../../services/axiosInstance";

const ResetPassword = () => {
  const { token } =
    useParams();

  const navigate =
    useNavigate();
const [password, setPassword] =
  useState("");

const [
  confirmPassword,
  setConfirmPassword,
] = useState("");

const [
  showPassword,
  setShowPassword,
] = useState(false);

const [
  showConfirmPassword,
  setShowConfirmPassword,
] = useState(false);
  
const handleSubmit =
  async (e) => {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      await axiosInstance.put(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(
        "Password Updated Successfully"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Reset Failed"
      );
    }
  };
  
return (
  <div
    className="
    min-h-screen
    bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')]
    bg-cover
    bg-center
    flex
    justify-center
    items-center
    px-4
    "
  >
    <div
      className="
      w-full
      max-w-md
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      shadow-2xl
      p-8
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
        Reset Password
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        {/* Password */}

        <div className="relative mb-4">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="New Password"
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
            pr-12
            outline-none
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

        {/* Confirm Password */}

        <div className="relative mb-6">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
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
            outline-none
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
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-3
          rounded-lg
          font-semibold
          transition
          "
        >
          Update Password
        </button>
      </form>
    </div>
  </div>
);
 
};

export default ResetPassword;