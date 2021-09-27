import { useReducer, useState } from "react";
import { Link} from "react-router-dom";
import { actions } from "../actions";
import Button from "../components/sub/Button";
import Input from "../components/sub/Input";
import loginReducer from "../reducers/loginReducer";
import { register } from "../requests/register";
import MiniLoader from "../components/main/MiniLoader"
const Register = () => {
  const [state, dispatch] = useReducer(loginReducer, {
    isLoading: false,
    success: false,
    error: false,
    errorMessage: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isLoading, success, error, errorMessage } = state;

  async function registerUser(e) {
    e.preventDefault();
    dispatch({ type: actions.LOGIN });

    try {
      const response = await register(email, username, password);
      if (response.data) {
        dispatch({ type: actions.SUCCESS });
        setEmail("");
        setPassword("");
        setUsername("");
        window.location.href="/"
        
      }
    } catch (error) {
      // dispatch({ type: actions.ERROR, payload:error.response.data.error });
      setPassword("");
      console.log(state);
    }
  }


  return (
    <div className="wrapper">
      <form className="login-form" onSubmit={registerUser}>
          <h2 style={{textAlign:"center", color:"#505050"}}>Register</h2>
            {error && <p style={{color:"red", textAlign: "center"}}>{errorMessage}</p>}
        {success && <p style={{color:"green", textAlign: "center"}}>Logging in</p>}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <Input className="input-regular" type="text" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <Input className="input-regular" type="text" id="username" value={username} onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <Input className="input-regular" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className="input-container" style={{margin:".5rem 0"}}>
          <Button className="btn btn-full btn-small btn-secondary small-border"  disabled={isLoading && true}>{isLoading ? <MiniLoader />:"Register"}</Button>
        </div>
        <p style={{textAlign:"center"}}>Already a member? <Link to="/login" style={{textDecoration:"none", color:"#165dde"}}>Log in</Link></p>
      </form>
    </div>
  );
};

export default Register;
