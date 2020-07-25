import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function Sidebar() {
  const [sidebarShowHideBtn, setSidebarShowHideBtn] = useState("sidebar-hide")
  const [sidebarShowHide, setSidebarShowHide] = useState("hide")
  const isTabletOrMobile = useMediaQuery({ 
    query: '(max-width: 768px)' 
  })

  const setSidebar = () => {
    if (sidebarShowHideBtn === "sidebar-hide") {
      setSidebarShowHideBtn("sidebar-show")
      setSidebarShowHide("show")
    }
    else {
      setSidebarShowHideBtn("sidebar-hide")
      setSidebarShowHide("hide")
    }
  }

  return (
    <div id="sidebar" className={sidebarShowHide}>
    {isTabletOrMobile ? 
      <div onClick={setSidebar} className="sidebar-open-close">
        <div className={sidebarShowHideBtn}>
          <div />
        </div>
      </div>
      : 
      <div />}
      <ul className="sidebar-list">
        <Link onClick={setSidebar} to="/"><li>Home</li></Link>
        <Link onClick={setSidebar} to="/upcoming"><li>Next Launch</li></Link>
        <Link onClick={setSidebar} to="past"><li>Past Launches</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
