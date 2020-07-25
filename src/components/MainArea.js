import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Timeline from "./Timeline/Timeline";
import Upcoming from "./Upcoming";

function MainArea() {
    
  return (
   
      <div className="page">
        <div className="main">
          <Header />
          <hr />
          <Route exact path={["/", "/past"]} component={Timeline} />
          <Route exact path="/upcoming" component={Upcoming} />  
        </div>
      </div>
    
  );
}

export default MainArea;