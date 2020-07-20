import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import TimelineElement from "./TimelineElement";
import "react-vertical-timeline-component/style.min.css";

function Timeline({location}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const detectPath = async () => {
    setIsLoading(true)
    let res
    let data
    if (location.pathname === "/upcoming") {
      res = await fetch("https://api.spacexdata.com/v3/launches/upcoming")
      data = await res.json()
    }
    else if (location.pathname === "/past") {
      res = await fetch("https://api.spacexdata.com/v3/launches/past")
      data = await res.json()
      data.reverse()
    }
    else {
      res = await fetch("https://api.spacexdata.com/v3/history")
      data = await res.json()
    }
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    detectPath()
  }, [location])

  return (
     <div className="timeline">
        {
          isLoading ? 
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          :
          <div className="timeline-cards">
            <VerticalTimeline>
              {data.map((e, index) => <TimelineElement key={index} data={e} />)}
            <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
            />
          </VerticalTimeline>
          </div>
        }
      </div>
  );
}

export default withRouter(Timeline);
