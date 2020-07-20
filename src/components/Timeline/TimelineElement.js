import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MDBBtn } from "mdbreact";
import "react-vertical-timeline-component/style.min.css";

/*
needs:
    mission patch for iconStyle
    mission date for date
    needs title for h3 (Either title for home or rocket_name for other)
    needs details for p
    needs link for button (either article link or video link)
*/
function TimelineElement({data, location}) {
  const [title, setTitle] = useState("Title")
  const [date, setDate] = useState()
  const [details, setDetails] = useState("No details available.")
  const [link, setLink] = useState()
  const [btnText, setBtnText] = useState()
  const [patch, setPatch] = useState("https://images2.imgbox.com/d2/3b/bQaWiil0_o.png");
  const style = {
    background: "#fff",
  };

  const setUpcomingPastData = () => {
    setTitle(data.mission_name)
    setDate(new Date(data.launch_date_utc).toLocaleString())
    if (data.details) {
      setDetails(data.details)
    }
    if (location.pathname === "/upcoming") {
      setLink(data.links.reddit_campaign)
      setBtnText("Reddit Link")
    }
    else {
      setLink(data.links.video_link)
      setBtnText("Video Link")
    }
    if (data.links.mission_patch) {
      setPatch(data.links.mission_patch)
    }
  }

  const setHistoryData = () => {
    setTitle(data.title)
    setDate(new Date(data.event_date_utc).toLocaleString())
    setDetails(data.details)
    setLink(data.links.article)
    setBtnText("Article Link")
  }

  useEffect(() => {
    if (location.pathname === "/upcoming" || location.pathname === "/past") {
      setUpcomingPastData()
    }
    else {
      setHistoryData()
    }
  }, [location])

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={style}
      date={date}
      dateClassName="timeline-card-date"
      icon={<img className="icon-img" src={patch} alt="mission patch" />}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <p>{details}</p>
      <div>
        <MDBBtn href={link} target="_blank" className="timeline-card-btn" color="secondary">
          {btnText}
        </MDBBtn>
      </div>
    </VerticalTimelineElement>
  );
}

export default withRouter(TimelineElement);
