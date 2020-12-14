import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MDBBtn } from "mdbreact";
import "react-vertical-timeline-component/style.min.css";

function TimelineElement({ data, location }) {
	const [title, setTitle] = useState("Title");
	const [date, setDate] = useState();
	const [details, setDetails] = useState("No details available.");
	const [link, setLink] = useState();
	const [btnText, setBtnText] = useState();
	const [patch, setPatch] = useState(
		"https://images2.imgbox.com/d2/3b/bQaWiil0_o.png"
	);
	const style = {
		background: "#fff",
	};

	const setUpcomingPastData = () => {
		setTitle(data.name);
		setDate(new Date(data.date_utc).toLocaleString());
		if (data.details) {
			setDetails(data.details);
		}
		if (location.pathname === "/upcoming") {
			setLink(data.links.reddit);
			setBtnText("Reddit Link");
		} else {
			setLink(data.links.webcast);
			setBtnText("Video Link");
		}
		if (data.links.patch) {
			if (data.links.patch.small) {
				setPatch(data.links.patch.small);
			}
		}
	};

	const setHistoryData = () => {
		setTitle(data.title);
		setDate(new Date(data.event_date_utc).toLocaleString());
		setDetails(data.details);
		setLink(data.links.article);
		setBtnText("Article Link");
	};

	useEffect(() => {
		if (
			location.pathname === "/upcoming" ||
			location.pathname === "/past"
		) {
			setUpcomingPastData();
		} else {
			setHistoryData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<VerticalTimelineElement
			className="vertical-timeline-element--work"
			contentStyle={style}
			date={date}
			dateClassName="timeline-card-date"
			icon={<img className="icon-img" src={patch} alt="mission patch" />}
			iconStyle={{ background: "#3E4551" }}
		>
			<h3 className="vertical-timeline-element-title">{title}</h3>
			<p>{details}</p>
			<div>
				<MDBBtn
					href={link}
					target="_blank"
					rel="noreferrer"
					className="timeline-card-btn"
					color="secondary"
				>
					{btnText}
				</MDBBtn>
			</div>
		</VerticalTimelineElement>
	);
}

export default withRouter(TimelineElement);
