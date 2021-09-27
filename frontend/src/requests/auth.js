import api from "./axios-config";
export const auth = async()=>{
const authenticate = await api.get("/users/is-auth");
return authenticate
}