import React from "react";
import Header from "./Header";
import Timeline from "./Timeline/Timeline";

function MainArea({location}) {
    
  return (
    <div className="page">
        <div className="main">
        <Header path={location.pathname} />
        <hr />
        <Timeline />
    </div>
    </div>
  );
}

export default MainArea;