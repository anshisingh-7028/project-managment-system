import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { FaUserEdit, FaTimes } from "react-icons/fa";

const EditUserModal = ({ user, setShowModal, fetchUsers }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/users/${user._id}`, form);

      alert("User Updated Successfully");

      fetchUsers();

      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
      p-4
      "
    >
      <div
        className="
        w-full
        max-w-lg
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
        animate-fadeIn
        "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-blue-600
          to-purple-700
          px-6
          py-5
          flex
          justify-between
          items-center
          "
        >
          <div className="flex items-center gap-3">
            <FaUserEdit className="text-white" size={24} />

            <h2
              className="
              text-xl
              sm:text-2xl
              font-bold
              text-white
              "
            >
              Edit User
            </h2>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="
            text-white
            hover:rotate-90
            duration-300
            "
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleUpdate} className="p-6 space-y-5">
          <div>
            <label className="font-semibold text-gray-700">Full Name</label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
              mt-2
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email</label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
              mt-2
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Role</label>

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="
              mt-2
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            >
              <option value="manager">Manager</option>

              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Buttons */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            justify-end
            gap-4
            pt-4
            "
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              bg-gray-500
              text-white
              hover:bg-gray-600
              transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-700
              text-white
              font-semibold
              hover:scale-105
              transition
              "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
