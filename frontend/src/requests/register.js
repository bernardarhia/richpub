import api from "./axios-config";
export const register = async (email, username, password) => {
  const response = await api.post("/users/register", { email, username, password });
  return response;
};
