import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MainArea from "./components/MainArea";
import "./css/App.css";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Sidebar} />
        <Route path="/" component={MainArea} /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
