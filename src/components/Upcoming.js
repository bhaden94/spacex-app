import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";
import DateCountdown from 'react-date-countdown-timer';
import LoadingIcon from './LoadingIcon';


function Upcoming() {
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [patch, setPatch] = useState("https://images2.imgbox.com/d2/3b/bQaWiil0_o.png")
    const [link, setLink] = useState("")
    const [dateTime, setDateTime] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isNextLaunch, setIsNextLaunch] = useState(true)

    const fetchUpcoming = async () => {
        setIsLoading(true)
        const res = await fetch("https://api.spacexdata.com/v4/launches/next")
        const json = await res.json()
        if (!(json.links.reddit.campaign || json.date_utc)) {
            setIsNextLaunch(false)
        } else {
            setTitle(json.name)
            setDetails(json.details)
            setPatch(json.links.patch.small)
            setLink(json.links.reddit.campaign)
            setDateTime(json.date_utc)
        }
        setIsLoading(false) 
    }

    useEffect(() => {
        fetchUpcoming()
    }, [])

  return (
    <div>
        <MDBContainer className="text-center">
            <MDBRow>
                <MDBCol>
                {isLoading ? <LoadingIcon /> : 
                    <MDBJumbotron className="p-0">
                        <MDBCol className="text-white text-center py-5 my-5" style={{ backgroundImage: `url(https://live.staticflickr.com/65535/49941719687_ea25d84d03_h.jpg)`, backgroundPosition: "35% 0%", backgroundSize: "cover" }}>
                            <MDBCol className="pb-5">
                            {isNextLaunch ?
                                <div>
                                    <MDBCardTitle className="font-bold"><DateCountdown dateTo={dateTime} mostSignificantFigure="day" /></MDBCardTitle>
                                    <br />
                                    <img src={patch} style={{width: "100px"}} />
                                    <MDBCardTitle className="h1-responsive pt-3 pb-3 font-bold">{title}</MDBCardTitle>
                                    <p className="mb-5">{details}</p>
                                    <MDBBtn href={link} target="_blank" outline color="light">Reddit Link</MDBBtn>
                                </div>
                                :
                                <div>
                                    <MDBCardTitle className="font-bold">There is no data available for the next SpaceX launch</MDBCardTitle>
                                    <br />
                                    <img src={patch} style={{width: "100px"}} />
                                    <MDBCardTitle className="h1-responsive pt-3 pb-3 font-bold"></MDBCardTitle>
                                    <p className="mb-5"></p>
                                </div>
                            }
                            </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                }
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </div>
  );
}

export default withRouter(Upcoming);