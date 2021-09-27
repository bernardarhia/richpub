import Wrapper from "../components/main/Wrapper";
import Input from "../components/sub/Input";
import Button from "../components/sub/Button";
import ItemTitle from "../components/sub/ItemTitle";
import { useEffect, useReducer, useState } from "react";
import Nav from "../components/main/Nav";
import MiniLoader from "../components/main/MiniLoader";
import axios from "../requests/axios-config";
import loginReducer from "../reducers/loginReducer";
import { actions } from "../actions";
const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer(loginReducer,{isLoading:false,error:false, errorMessage:"",success:false })
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const user = await axios.get("/users/me");
    setEmail(user.data.email);
    setUsername(user.data.username);
  }

  async function updateProfile(e) {
    e.preventDefault();
    dispatch({ type: actions.LOGIN})
    try {
      const user = await axios.put("/users/update-profile", {
        email,
        username,
      });
      if(user)dispatch({ type: actions.SUCCESS})
    setEmail(user.data.email);
    setUsername(user.data.username);
    } catch (error) {
          dispatch({ type: actions.ERROR, payload:error.response.data.error });
    }
  }

  return (
    <>
      {/* Switch navbar base on role type */}
      <Nav />
      <Wrapper>
        <ItemTitle className="title-medium">Profile</ItemTitle>
           {state.error && <p style={{color:"red", textAlign: "center"}}>{state.errorMessage}</p>}
        {state.success && <p style={{color:"green", textAlign: "center"}}>Profile updated</p>}
        <form onSubmit={updateProfile}>
          <div className="input-container">
            <label htmlFor="name">Email</label>
            <Input
              className="input-regular"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="price">Username</label>
            <Input
              className="input-regular"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            {" "}
            <Button className="btn btn-blue btn-medium btn-full small-border">
              {" "}
              {state.isLoading ? <MiniLoader /> : "Update Profile"}
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Profile;
