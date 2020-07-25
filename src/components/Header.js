import React, { useState, useEffect } from "react";

function Header({path}) {
  const [header, setHeader] =  useState("History")

    useEffect(() => {
        if(path
         === "/upcoming") {
            setHeader("Next Launch")
        }
        else if(path
         === "/past") {
            setHeader("Past Launches")
        }
        else {
            setHeader("History")
        }
    }, [path
  ])

  return (
    <div>
        <h1 className="main-header">SpaceX {header}</h1>
    </div>   
  );
}

export default Header;