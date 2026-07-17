import axiosInstance from "./axiosInstance";

export const getNotifications = () => {
  return axiosInstance.get("/notifications");
};

export const markRead = (id) => {
  return axiosInstance.put(`/notifications/${id}`);
};

export const clearNotifications = () => {
  return axiosInstance.delete("/notifications");
};