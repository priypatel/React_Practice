import axiosClient from "./axiosClient.js";

export const getUsers = async () => {
  const res = await axiosClient.get("/users");
  return res.data;
};

export const createUser = async (user) => {
  const res = await axiosClient.post("/users", user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axiosClient.put(`/users/${id}`, user);
  return res.data;
};
