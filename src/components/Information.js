import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React from "react";
// import developerLibrary from "../components/images/developerLibrary.jpg";

function information() {
    return (
        <div>
            {/* <div style={{
                display: "flex", flexDirection: "row", backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${developerLibrary})`, backgroundSize: "100%", fontSize: "15px", fontWeight: "bold",
                color: "white",
                backgroundRepeat: 'no-repeat', opacity: "0.9"
            }}>


                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", margin: "10px"
                }}>
                    <h1>rFMS</h1><br></br>
                    <h5 style={{
                        display: "flex", flexDirection: "column", alignItems: "center", margin: "20px"
                    }}>rFMS is an automotive standard, that is defined and supported by the OEMs in the truck industry in the EU.<br></br></h5>
                    All data is made available through a Data Interface (API).
                </div>
                <div style={{
                    width: "390px", backgroundColor: "#353c45", margin: "30px"
                }}>
                    <br></br>
                    <p>
                        This standard describes:
                        <ul>
                            <li>
                                Secure authentication
                            </li>
                            <li>
                                Data elements for vehicle location, status and uptime
                            </li>
                            <li>
                                Triggers that define the frequency and events in which the data is recorded
                            </li>
                        </ul>

                    </p>
                </div>

            </div> */}





            <br></br>
            <h3>DATA SERVICES</h3>
            <h4>Location Pack</h4>
            <Paper >
                <div style={{ width: "50%", float: "left", }}>
                    <p style={{ fontWeight: "bold", }}>Data</p>
                    <p>elements which are gathered by the TCU</p>
                </div>
                <div style={{ width: "50%", float: "right", }}>

                    <p style={{ fontWeight: "bold" }}>Triggers</p>
                    <p>describe the events that cause the collection and storing of the data elements</p>
                </div>

                <div style={{ alignItems: "flex-start", gap: "20px", display: "flex", flexDirection: "row", width: "100%" }}>
                    <div style={{
                        width: "50%", float: "left", p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        fontStyle: "oblique",
                        fontSize: "15px", gap: "10px", flexWrap: "wrap", margin: "10px"
                    }}>

                        <Button variant="outlined" style={{ cursor: "help" }} title="Vehicle identification number (17 characters)">VIN</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The name of the vehicle that the customer provided">Customer Vehicle Name</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Identification of the trigger type that led to the event">Trigger Type</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Date the data was received on the Original Equipment Manufacturer's back-end systems">Received Date/Time</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Date the data was generated in the vehicle">Created Date/Time</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Date on which the data was requested">Request Server Date/Time</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Latitude">Latitude</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Longitude">Longtitude</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The direction of the vehicle">Heading</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The altitude of the vehicle">Altitude</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The GPS speed in km/h" >GPS Speed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The time of the position data" >Position Date/Time</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The speed of the vehicle based on the wheel speed">WheelBased Speed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The speed according to the tachograph">Tachograph Speed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The total distance traveled by the vehicle in meters">Total Vehicle Distance</Button>
                    </div>
                    <div style={{
                        width: "50%", p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        fontStyle: "oblique",
                        fontSize: "15px", gap: "10px", flexWrap: "wrap", margin: "10px"
                    }}>


                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to a timer trigger">Timer</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an ignition on">Ignition on</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an ignition off">Ignition off</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to a successful driver login.">Driver login</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to a driver logout">Driver logout</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an engine on">Engine on</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an engine off">Engine off</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to that driver 1 changed working state">Driver one working state changed</Button>

                    </div>
                </div>
            </Paper>
        </div>

    )
};

export default information;
