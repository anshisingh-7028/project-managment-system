import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const handleSubmit =
async (e) => {
  e.preventDefault();

  try {
    const res =
      await axiosInstance.post(
        "/auth/forgot-password",
        {
          email,
        }
      );
      

    alert(
      res.data.message
    );
  } catch (error) {
    console.log(error);
  

  alert(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
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
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
            w-full
            p-3
            rounded-lg
            mb-4
            "
          />

          <button
            type="submit"
            className="
            w-full
            bg-blue-600
            text-white
            p-3
            rounded-lg
            "
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;