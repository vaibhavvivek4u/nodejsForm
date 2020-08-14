import React from "react";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Register} />
    </Router>
  );
}

export default App;
