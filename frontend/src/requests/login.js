import api from "./axios-config";
export const login = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  return response;
};
