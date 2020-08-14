import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/home" component={Home} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </Router>
  );
};

export default App;
