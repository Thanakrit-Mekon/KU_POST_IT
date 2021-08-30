import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import CsvTable from "./pages/csvTable";
// import EditPost from "./pages/EditPost";
// import Query from "./pages/Query";
import QueryUser from "./pages/QueryUser";
import Postinfor from "./pages/Postinfor";
import ChangePassword from "./pages/ChangePassword";
import JoinedPosts from "./pages/JoinedPosts";
import "@fontsource/roboto";
import { useEffect, useState } from "react";
import axios from "./axios";

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

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/myprofile">
              <MyProfile user={user} setUser={setUser} />
            </Route>
            <Route path="/changepassword">
              <ChangePassword user={user} setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path={["/ta", "/coop", "/intern"]}>
              <QueryUser user={user} setUser={setUser} />
            </Route>
            <Route path="/posts/new">
              <CreatePost />
            </Route>
            {/* <Route path="/posts/edit">
              <EditPost />
            </Route> */}
            <Route path="/posts/:postId">
              <Postinfor user={user} setUser={setUser} />
            </Route>
            <Route path="/myposts/:postId">
              <CsvTable user={user} setUser={setUser} />
            </Route>
            <Route path="/myposts">
              <MyPost user={user} setUser={setUser} />
            </Route>
            <Route path="/joinedposts">
              <JoinedPosts user={user} setUser={setUser} />
            </Route>
            <Route path="/" exact>
              <Login setUser={setUser} />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
