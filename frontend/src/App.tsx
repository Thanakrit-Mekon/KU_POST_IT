import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import CsvTable from "./pages/csvTable";
import EditPost from "./pages/EditPost";
import Query from './pages/Query';
import QueryUser from './pages/QueryUser';
import Postinfor from './pages/Postinfor';
import ChangePassword from "./pages/ChangePassword";
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
  faculty_code?: string;
  department_code?: string;
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
            <Route path="/ta" />
            <Route path="/project-coop" />
            <Route path="/internship" />
            <Route path="/posts/new"><CreatePost /></Route>
            <Route path="/posts" ><Query/></Route>
            <Route path="/User" ><QueryUser/></Route>
            <Route path="/Postinfor" ><Postinfor/></Route>
            <Route path="/posts/new">
              <CreatePost />
            </Route>
            <Route path="/posts/edit">
              <EditPost />
            </Route>
            <Route path="/posts">
              <MyPost user={user} setUser={setUser} />
            </Route>
            <Route path="/posts/:postId" />
            <Route path="/table">
              <CsvTable />
            </Route>
            <Route path="/" exact />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
