import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";

function Header({location}) {
  const [header, setHeader] =  useState("History")

    useEffect(() => {
        if(location.pathname
         === "/upcoming") {
            setHeader("Next Launch")
        }
        else if(location.pathname
         === "/past") {
            setHeader("Past Launches")
        }
        else {
            setHeader("History")
        }
    }, [location.pathname
  ])

  return (
    <div>
        <h1 className="main-header">SpaceX {header}</h1>
    </div>   
  );
}

export default withRouter(Header);