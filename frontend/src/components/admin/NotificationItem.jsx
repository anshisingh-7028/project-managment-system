import {
  FaUser,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";

const NotificationItem = ({ item, onRead }) => {

  const icons = {
    user: <FaUser />,
    employee: <FaUsers />,
    project: <FaProjectDiagram />,
    task: <FaTasks />,
  };

  return (
    <div
      onClick={() => onRead(item._id)}
      className={`p-3 rounded-lg cursor-pointer transition
      ${
        item.isRead
          ? "bg-white/5"
          : "bg-blue-600/30"
      }`}
    >

      <div className="flex gap-3">

        <div className="text-xl">
          {icons[item.type]}
        </div>

        <div>

          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-gray-300">
            {item.message}
          </p>

          <small className="text-gray-400">
            {new Date(
              item.createdAt
            ).toLocaleString()}
          </small>

        </div>

      </div>

    </div>
  );
};

export default NotificationItem;