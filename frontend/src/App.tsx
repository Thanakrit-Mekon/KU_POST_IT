import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E9EA0",
    },
  },
});

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/myprofile">
              <MyProfile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/ta" />
            <Route path="/project-coop" />
            <Route path="/internship" />
            <Route path="/posts/new">
              <CreatePost />
            </Route>
            <Route path="/posts">
              <MyPost />
            </Route>
            <Route path="/posts/:postId" />
            <Route path="/posts/:postId/table" />
            <Route path="/" exact />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
