import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import CsvTable from "./pages/csvTable";
import QueryUser from "./pages/QueryUser";
import Postinfor from "./pages/Postinfor";
import ChangePassword from "./pages/ChangePassword";
import JoinedPosts from "./pages/JoinedPosts";
import "@fontsource/roboto";
import { useEffect, useState } from "react";
import axios from "./axios";
import EditPost from "./pages/EditPost";
import PrivateRoute from "./routes/PrivateRoute";
// import { isLogin } from "./utils/isLogin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E9EA0",
    },
  },
});

export interface User {
  profile_url: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone: string;
  student_id?: string;
  faculty_name?: string;
  department_name?: string;
  get_notify: boolean;
  name?: string;
  location?: string;
  contact?: string;
  about_me?: string;
}

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.get("/user/getuser").then((response) => {
        setUser(response.data[0]);
      });
    }
  }, []);

  const isAuthenticated = user;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/myprofile" isAuthenticated={isAuthenticated}>
            <MyProfile user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute
            path="/changepassword"
            isAuthenticated={isAuthenticated}
          >
            <ChangePassword user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute
            path={["/ta", "/coop", "/intern"]}
            isAuthenticated={isAuthenticated}
          >
            <QueryUser user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/posts/new" isAuthenticated={isAuthenticated}>
            <CreatePost />
          </PrivateRoute>
          <PrivateRoute
            path="/posts/:postId/edit"
            isAuthenticated={isAuthenticated}
          >
            <EditPost />
          </PrivateRoute>
          <PrivateRoute path="/posts/:postId" isAuthenticated={isAuthenticated}>
            <Postinfor user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute
            path="/myposts/:postId"
            isAuthenticated={isAuthenticated}
          >
            <CsvTable user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/myposts" isAuthenticated={isAuthenticated}>
            <MyPost user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/joinedposts" isAuthenticated={isAuthenticated}>
              <JoinedPosts user={user} setUser={setUser} />
          </PrivateRoute>
          <Route path="/" exact>
            <Login setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
