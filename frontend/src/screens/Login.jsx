import { Link } from "react-router-dom";
import Button from "../components/sub/Button";
import Input from "../components/sub/Input";
import { useReducer, useState } from "react";
import MiniLoader from "../components/main/MiniLoader";
import { actions } from "../actions";
import loginReducer from "../reducers/loginReducer";
import { login } from "../requests/login";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, {
    isLoading: false,
    success: false,
    error: false,
    errorMessage: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, success, error, errorMessage } = state;

  async function loginUser(e) {
    e.preventDefault();
    dispatch({ type: actions.LOGIN });

    try {
      const response = await login(email, password);
      if (response.data) {
        dispatch({ type: actions.SUCCESS });
        setEmail("");
        setPassword("");
        window.location.href="/"
        
      }
    } catch (error) {
      dispatch({ type: actions.ERROR, payload:error.response.data.error });
      setPassword("");
    }
  }


  return (
    <div className="wrapper">
      <form className="login-form" onSubmit={loginUser}>
        <h2 style={{ textAlign: "center", color: "#505050" }}>Log in</h2>
        {error && <p style={{color:"red", textAlign: "center"}}>{errorMessage}</p>}
        {success && <p style={{color:"green", textAlign: "center"}}>Logging in</p>}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <Input
            className="input-regular"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Password</label>
          <Input
            className="input-regular"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container" style={{ margin: ".5rem 0" }}>
          <Button
            className="btn btn-full btn-small btn-secondary small-border"
            disabled={isLoading && true}
          >
            {isLoading ? <MiniLoader /> : "Log in"}
          </Button>
        </div>
        <p style={{ textAlign: "center" }}>
          Not a registered?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#165dde" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
