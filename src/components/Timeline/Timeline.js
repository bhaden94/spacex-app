import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { MDBIcon } from "mdbreact";
import { useMediaQuery } from 'react-responsive'
import TimelineElement from "./TimelineElement";
import "react-vertical-timeline-component/style.min.css";



function Timeline({location}) {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const loadingIcon = 
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>

  const loadMoreBtn = 
    <MDBIcon className="timeline-card-load-btn" icon="plus" size="2x" />


  const fetchUpcoming = async () => {
    setYear(new Date().getFullYear())
    const res = await fetch("https://api.spacexdata.com/v3/launches/upcoming")
    const json = await res.json()
    return json
  }

  const fetchPast = async () => {
    const res = await fetch(`https://api.spacexdata.com/v3/launches/past?order=desc&start=${year}-01-01&end=${year}-12-31`)
    const json = await res.json()
    setYear(year - 1)
    return json
  }

  const fetchHistory = async () => {
    setYear(new Date().getFullYear())
    const res = await fetch("https://api.spacexdata.com/v3/history")
    const json = await res.json()
    return json
  }

  const detectPath = async () => {
    setIsLoading(true)
    let currentData
    if (location.pathname === "/upcoming") {
      currentData = await fetchUpcoming()
    }
    else if (location.pathname === "/past") {
      currentData = await fetchPast()
    }
    else {
      currentData = await fetchHistory()
    }
    setData(currentData)
    setIsLoading(false)
  }

  const loadMore = async () => {
    setIsLoadingMore(true)
    const newData = await fetchPast()
    setData([...data, ...newData])
    setIsLoadingMore(false)
  }

  useEffect(() => {
    detectPath()
  }, [location])

  return (
     <div className="timeline">
        {isLoading ? loadingIcon :
          <div className="timeline-cards">
            <VerticalTimeline animate={isMobile ? false : true}>
              {data.map((e, index) => <TimelineElement key={index} data={e} />)}

              {location.pathname === "/past" ? 
              <VerticalTimelineElement
                iconOnClick={loadMore}
                iconClassName="timeline-card-load-more-icon"
                icon={isLoadingMore ? loadingIcon : loadMoreBtn}
              /> : 
              <VerticalTimelineElement
                iconClassName="timeline-card-load-icon"
              />}

            </VerticalTimeline>
          </div>}
      </div>
  );
}

export default withRouter(Timeline);
