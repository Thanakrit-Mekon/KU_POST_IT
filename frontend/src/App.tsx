import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "@fontsource/roboto";
import { useEffect, useState } from "react";
import axios from "./axios";

import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import CsvTable from "./pages/csvTable";
import Feed from "./pages/Feed";
import PostInformation from "./pages/PostInformation";
import ChangePassword from "./pages/ChangePassword";
import JoinedPosts from "./pages/JoinedPosts";
import EditPost from "./pages/EditPost";
import PrivateRoute from "./routes/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import PostTable from "./pages/PostTable";
import VerifiedEmail from "./pages/VerifiedEmail";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.get("/user/getuser").then((response) => {
        setUser(response.data[0]);
        setIsLoading(false);
      });
    } else setIsLoading(false);
  }, []);

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
          <Route path="/verified">
            <VerifiedEmail />
          </Route>
          <PrivateRoute path="/myprofile" isLoading={isLoading}>
            <MyProfile user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/changepassword" isLoading={isLoading}>
            <ChangePassword user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute
            path={["/ta", "/coop", "/intern"]}
            isLoading={isLoading}
          >
            <Feed user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/posts/new" isLoading={isLoading}>
            <CreatePost />
          </PrivateRoute>
          <PrivateRoute path="/posts/edit/:postId" isLoading={isLoading}>
            <EditPost />
          </PrivateRoute>
          <PrivateRoute path="/posts/:postId" isLoading={isLoading}>
            <PostInformation user={user}/>
          </PrivateRoute>
          <PrivateRoute path="/myposts/closed/:postId" isLoading={isLoading}>
            <PostTable user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/myposts/:postId" isLoading={isLoading}>
            <CsvTable user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/myposts" isLoading={isLoading}>
            <MyPost user={user} setUser={setUser} />
          </PrivateRoute>
          <PrivateRoute path="/joinedposts" isLoading={isLoading}>
            <JoinedPosts user={user} setUser={setUser} />
          </PrivateRoute>
          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
