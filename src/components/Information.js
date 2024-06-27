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
            </Paper> <h4>Essential Pack</h4>
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
                        <Button variant="outlined" style={{ cursor: "help" }} title="The unique identification of a driver in a Member State.">DriverIdentification</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The total distance traveled by the vehicle in meters">CardIssuingMemberState</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="A card replacement index">CardReplacementIndex</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="A card renewal index.">CardRenewalIndex</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Code to distinguish different types of equipment for the tachograph application">DriverAuthenticationEquipment</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The driver 1 identity">Driver1ID</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The working state of driver 1">Driver1WorkingState</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Accumulated distance travelled by the vehicle during its operation in meter">TotalVehicleDistance</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The total fuel the vehicle has used during its lifetime in MilliLitres">EngineTotalFuelUsed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The full vehicle weight in kg">GrossCombinationWeight</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The fuel level percentage">FuelLevel1</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The adblue level percentage">CatalystFuelLevel</Button>
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
            <h4>Advanced Pack</h4>
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
                        <Button variant="outlined" style={{ cursor: "help" }} title="The vehicle brand">Brand</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The type of vehicle">Type</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The model of the vehicle">Model</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Indicates when the vehicle was produced">Production Date</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Day">Day</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Month">Month</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Year">Year</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The possible fuel types supported by this vehicle">Possible FuelType</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The emission level this vehicle supports">Emission Level</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The chassis type of the vehicle">Chassis Type</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Number of axles on the vehicle">No Of Axles</Button>
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
                        <Button variant="outlined" style={{ cursor: "help" }} title="The engine speed in rev/min">Engine Speed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The speed according to the tachograph">Tachograph Speed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The unique identification of a driver in a Member State.">Driver Identification</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The total distance traveled by the vehicle in meters">Card Issuing MemberState</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="A card replacement index">CardReplacementIndex</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="A card renewal index.">CardRenewalIndex</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Code to distinguish different types of equipment for the tachograph application">DriverAuthenticationEquipment</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The driver 1 identity">Driver1ID</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The working state of driver 1">Driver1WorkingState</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Accumulated distance travelled by the vehicle during its operation in meter">TotalVehicleDistance</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The total fuel the vehicle has used during its lifetime in MilliLitres">EngineTotalFuelUsed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The full vehicle weight in kg">GrossCombinationWeight</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The fuel level percentage">FuelLevel1</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="The adblue level percentage">CatalystFuelLevel</Button>
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
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to a successful driver login">Driver login</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to a driver logout">Driver logout</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an engine on">Engine on</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to an engine off">Engine off</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to that driver 1 changed working state">Driver one working state changed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to that driver 2 changed working state">Driver two working state changed</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="PTO enabled">PTO on</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="PTO disabled">PTO off</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to that a set distance was travelled">Distance Travelled</Button>
                        <Button variant="outlined" style={{ cursor: "help" }} title="Data was sent due to that at least one tell tale changed state">TellTale</Button>

                    </div>
                </div>
            </Paper>
        </div>

    )
};

export default information;
