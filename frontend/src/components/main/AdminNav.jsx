import { Link } from "react-router-dom";
import Button from "../sub/Button";
import Logo from "../sub/Logo";
import { useHistory } from "react-router-dom";
import axios from "../../requests/axios-config";
const Nav = ({ isLoggedIn }) => {
  const nav = [
    {
      name: "Dashboard",
      url: "/",
    },
    {
      name: "My Books",
      url: "/my-books",
    },
  ];
  let history = useHistory();

  const logout = async () => {
    const result = await axios.post("/users/logout");
    if (result.data) window.location.reload();
  };
  return (
    <nav className="nav-container">
      <div className="page-logo"> 
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="nav-lists__container">
        <ul className="nav-lists">
          {nav.map((item, index) => {
            return item.url === "/cart" ? (
              <li key={index} className="cart">
                <Link to={item.url}>{item.name}</Link>(
                <span style={{ fontSize: "12px", color: "#333" }}>0</span>)
              </li>
            ) : (
              <li key={index}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            );
          })}
          {isLoggedIn && isLoggedIn === true ? (
            <Button
              className="btn btn-small small-shadow small-border"
              onClick={logout}
              style={{ background: "#ff000061" }}
            >
              Log out
            </Button>
          ) : (
            <Button
              className="btn btn-primary btn-small small-shadow small-border"
              onClick={() => history.push("/login")}
            >
              Log in
            </Button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
