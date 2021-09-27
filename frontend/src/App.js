import UserProvider from "./context/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./screens/Home";
import "./style/style.css";
import Cart from "./screens/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import FullLoader from "./components/main/FullLoader";
import { auth } from "./requests/auth";
import AddBook from "./screens/AddBook";
import MyBooks from "./screens/MyBooks";
import EditBook from "./screens/EditBook";
import AdminDashboard from "./screens/AdminDashboard";
import Profile from "./screens/Profile";
function App() {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await auth();

        setLoader(true);
        if (response.data) {
          setIsAuth(response.data);
        }
      } catch (error) {
        setLoader(true);
      }
    }
    authenticate();
  }, [history, isAuth]);

  return (
    <>
      <FullLoader loader={loader} />
      <Router>
        <Switch>
          <UserProvider>
            <Route path="/" exact render={() => <Home isAuth={isAuth} />} />
            <Route path="/register" exact component={Register} />
            <ProtectedRoute
              path="/books/:id"
              component={Cart}
              isAuth={isAuth}
              exact
            />
            <Route path="/login" exact component={Login} />
            <Route path="/add-book" exact component={AddBook} />
            <Route path="/my-books" exact component={MyBooks} />
            <Route path="/edit-book/:id" exact component={EditBook} />
            <Route path="/dashboard" exact component={AdminDashboard} />
            <Route path="/me" exact component={Profile} />
          </UserProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
