import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Sidebar from "./components/Sidebar/Sidebar";
import MainArea from "./components/MainArea";
import "./App.css";

function App() {

  const isTabletOrMobile = useMediaQuery({ 
    query: '(max-width: 768px)' 
  })

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
