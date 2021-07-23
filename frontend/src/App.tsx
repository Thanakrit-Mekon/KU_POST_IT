import Register from "./pages/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MyProfile from "./pages/MyProfile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E9EA0",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login"></Route>
            <Route path="/myprofile">
              <MyProfile />
            </Route>
            <Route path="/ta"></Route>
            <Route path="/project-coop"></Route>
            <Route path="/internship"></Route>
            <Route path="/posts/new"></Route>
            <Route path="/posts"></Route>
            <Route path="/posts/:postId"></Route>
            <Route path="/posts/:postId/edit"></Route>
            <Route path="/" exact></Route>
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
