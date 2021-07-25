import Login from "./pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/login"></Route>
          <Route path="/sta"></Route>
          <Route path="/project-coop"></Route>
          <Route path="/internship"></Route>
          <Route path="/posts/new"></Route>
          <Route path="/posts"></Route>
          <Route path="/posts/:postId"></Route>
          <Route path="/posts/:postId/edit"></Route>
          <Route path="/" exact></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
