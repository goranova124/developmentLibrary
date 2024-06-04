import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import parameters from '../src/components/images/parameters.png';
import App from "../src/components/listItems";
import { Button } from '../src/components/styles/Styls';

const Documenantion = () => {


  function scrollToTop() {
    document.querySelector(`#initial-header`).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });
  }




  function animateHeading(headingElement) {
    headingElement.style.fontSize = '2.2em';
    headingElement.style.transition = 'font-size 0.9s';

    setTimeout(() => {
      headingElement.style.fontSize = '';
      headingElement.style.transition = 'font-size 0.5s';
    }, 1000);
  }

  const Headings = ({ headings, activeId }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: "10px",
    }}>

      <ul >
        <h5>Table of Contents</h5>
        <br></br>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.id === activeId ? "active" : ""}
          >
            <a
              href={`#${heading.id}`}
              style={{ fontWeight: "bold" }}
              onClick={(e) => {
                e.preventDefault();
                console.log(heading.id);
                const headingElement = document.querySelector(`#${heading.id}`);
                animateHeading(headingElement);
                document.querySelector(`#${heading.id}`).scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest"
                });

              }}
            >
              {heading.title}
            </a>

            {heading.items.length > 0 && (
              <ul>
                {heading.items.map((child) => (
                  <li
                    key={child.id}
                    className={child.id === activeId ? "active" : ""}
                  >
                    <a
                      href={`#${child.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(child.id);
                        const headingElement = document.querySelector(`#${child.id}`);
                        animateHeading(headingElement);
                        document.querySelector(`#${child.id}`).scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                          inline: "nearest"
                        });
                      }}
                    >
                      {child.title}
                    </a>
                    {child.items.length > 0 && (
                      <ul>
                        {child.items.map((subChild) => (
                          <li
                            key={subChild.id}
                            className={subChild.id === activeId ? "active" : ""}
                          >
                            <a
                              href={`#${subChild.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(subChild.id);
                                const headingElement = document.querySelector(`#${subChild.id}`);
                                animateHeading(headingElement);
                                document.querySelector(`#${subChild.id}`).scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                  inline: "nearest"
                                });
                              }}
                            >
                              {subChild.title}
                            </a>

                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <Button onClick={scrollToTop}>^</Button>
    </div>
  );




  const TableOfContents = () => {
    const [activeId, setActiveId] = React.useState();
    const { nestedHeadings } = useHeadingsData();
    useIntersectionObserver(setActiveId);

    return (
      <Headings headings={nestedHeadings} activeId={activeId} />
    );
  };
  const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = React.useRef({});
    React.useEffect(() => {
      const callback = (headings) => {
        headingElementsRef.current = headings.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);

        const visibleHeadings = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
        });

        const getIndexFromId = (id) =>
          headingElements.findIndex((heading) => heading.id === id);

        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);

        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
          );

          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      };

      const observer = new IntersectionObserver(callback, { root: document.querySelector("iframe"), rootMargin: "500px" });

      const headingElements = Array.from(document.querySelectorAll("h2, h3,h1,h3,h5,h6"));

      headingElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }, [setActiveId]);
  };
  const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = React.useState([]);

    React.useEffect(() => {
      const headingElements = Array.from(
        document.querySelectorAll("main h2, main h3,main h1,main h4, main h5,main h6")
      );

      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);

    return { nestedHeadings };
  };
  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];

    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === "H3") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H4" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
          items: []
        })
          ;
      } else if (heading.nodeName === "H5" && nestedHeadings.length > 0) {
        const parentItems = nestedHeadings[nestedHeadings.length - 1].items;
        if (parentItems.length > 0) {
          const subParentItem = parentItems[parentItems.length - 1].items;
          if (subParentItem.length === 0 || subParentItem[subParentItem.length - 1].items) {
            subParentItem.push({ id, title, items: [] });
          } else {
            subParentItem[subParentItem.length - 1].items.push({ id, title, items: [] });
          }
        }
      }

    });

    return nestedHeadings;
  };


  return (

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <App />
      <TableOfContents />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          flexDirection: 'column',
        }}
      >
        <Toolbar />

        <div id="mainComp" className="container">
          <main style={{ margin: "10px" }}>
            <h1>Developer Library Docs </h1>

            <h3 id="initial-header">Introduction</h3>

            <p>The rFMS API is used to remotely access vehicle FMS data in a standardized way without installing any additional hardware to the vehicle by using the existing OEM hardware.</p>
            <h3 id="second-header">General remarks</h3>
            <ul style={{ listStyleType: 'disc' }}>
              <li> The following is valid for all services.</li>
              <li>Parameters not supported by the vehicle will not be part of the response even if they are marked as mandatory.</li>
              <li>Parameters currently unavailable or invalid will not be part of the response even if they are marked as mandatory (e.g. missing consent of the driver).</li>
              <li>Updates of data might be not possible during special conditions, e.g. ignition off, communication not possible, etc.</li>
              <li>All responses are in JSON.</li>
              <li>The timestamps in the responses are in UTC and always formatted as a string according to ISO8601.</li>
              <li>Timestamps in the requests shall be sent according ISO 8601. Timestamps sent with milliseconds will be accepted. However, milliseconds are ignored.</li>
              <li>Data received during the latest, not fully elapsed, second at the server cannot be sent to the client, i.e. if the current time at the server is 10:01:02.123, only data registered up to 10:01:01.999 can be returned. This to avoid duplicated and/or missing data</li>
            </ul>
            <h3 id="third-header">Communication</h3>
            <p>The rFMS API is a HTTPS based REST API.</p>
            <h4 id="fourth-header">HTTP headers</h4>
            <p>There are a few mandatory HTTP headers for the rFMS API.</p>
            <ul style={{ listStyleType: 'disc' }}>
              <li>Authorization</li>
              <li>Accept</li>
            </ul>

            <h5 id="fifth-header">Security</h5>
            <h6 id="sixt-header">OAuth2</h6>
            <p>
              An OAuth2 security solution shall be used, and it shall comply to the rFMS authorization specification 1.0.x The access token is set in the Authorization HTTP header.
            </p>
            <ul style={{ listStyleType: 'disc', fontWeight: "bold" }}>
              <li >HTTP header field: Authorization</li>
              <li>Format: Bearer [access token]</li>
            </ul>
            <p>Example:
              Authorization: Bearer QWxhZG.RpbjpvcGVuIHNl.c2FtZQ==</p>
            <h6 id="seventh-header">
              API versioning
            </h6>
            <p>The resource URL’s has no versions, but the client defines in the media type HTTP header which response version that is wanted. This version is related to the version of the specification.
              This is done in the Accept HTTP header. <br></br>Example:<br></br>
              Accept: application/vnd.fmsstandard.com.vehiclestatuses.v3.0+json; UTF-8
              In this example the clients expect to get a VehicleStatuses of API version 3.0 in JSON format back from the vehicle statuses resource.</p>

            <h6 id="eight-header">
              Rate Limitations
            </h6>
            <p>This is used to inform the client on the current rate limitations for the service.
              Rate limits are divided into intervals, for each interval there is a pool of available requests.
              The rate limitation is an optional feature and might not be available at all OEMs.</p>

            <p style={{ textDecoration: "underline" }}>HTTP headers in response</p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">X-Rate-Limit-Limit</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The limit of requests within the given time frame</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">X-Rate-Limit-Remaining</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The remaining number of requests until reset</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">X-Rate-Limit-Reset</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The time in UTC until rate limit reset in second since 01.01.1970</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <p>When the limit is exceeded the API will return HTTP 429 “Too Many Requests”
              Remark: Assume each request will be counted even if it is a request based on the “more data available”</p>
            <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Example:</p><p>This is returned at 2016-04-06T20:00:00 (1459972800)</p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Resource</TableCell>
                    <TableCell align="right">X-Rate-Limit-Remaining</TableCell>
                    <TableCell align="right">X-Rate-Limit-Reset</TableCell>
                    <TableCell align="right">X-Rate-Limit-Limit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">/vehiclepositions</TableCell>
                    <TableCell align="right">55</TableCell>
                    <TableCell align="right">1459973400</TableCell>
                    <TableCell align="right">60</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">/vehicles</TableCell>
                    <TableCell align="right">2</TableCell>
                    <TableCell align="right">1459984500</TableCell>
                    <TableCell align="right">4</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">/vehiclestatuses</TableCell>
                    <TableCell align="right">28</TableCell>
                    <TableCell align="right">1459973460</TableCell>
                    <TableCell align="right">30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <p>In this example the client can</p>
            <ul style={{ listStyleType: 'disc' }}>
              <li >request vehiclepositions 55 times for the next 10 minutes.</li>
              <li>request vehicles 2 times for the next 3 hours and 15 minutes</li>
              <li>request vehiclestatuses 28 times for the next 11 minutes.</li>
            </ul>
            <Divider />

            <h3 id="ninth-header">Vehicle API</h3>

            <p>The vehicle resource is used to get a list of all the vehicles the client credentials has access to. The vehicle list is always returned in the same order.</p>
            <h4 id="tenth-header">Response</h4>
            <p>The response object Vehicle contains the following:</p>
            <h5 id="eleventh-header">Vehicles</h5>
            <p>This is the response that will be sent back for a request to the Vehicles resource. It will contain a list of vehicles matching the filter parameters supplied in the request.
              If there are no vehicles in the account an empty list will be returned
              The response is</p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">vin</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">vehicle identification number
                      See ISO 3779 (17 characters)</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">customerVehicleName</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The customer’s name for the vehicle.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">brand</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The vehicle brand.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">type</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The type of vehicle (e.g. Bus)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">model</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The model of the vehicle.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">productionDate</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Indicates when the vehicle was produced.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">possibleFuelType</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The possible fuel types supported by this vehicle, formatted as the hex id number according to SPN 5837.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">emissionLevel</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">TThe emission level this vehicle supports</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">tellTaleCode</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">This parameter indicates how the tell tales shall be interpreted, the code is unique for each OEM.
                      One OEM can have different interpretations depending on vehicle type.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">chassisType</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The chassis type of the vehicle.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">noOfAxles</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Number of axles on the vehicle.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">totalFuelTankVolume</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Total fuel volume for all tanks in millilitres- tank volume only.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">tachographType</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The type of tachograph in the vehicle.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">gearboxType</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The type of gearbox the vehicle is equipped with.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">bodyType</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The type of body on the chassis.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">doorConfiguration</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The door configuration.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">hasRampOrLift</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">If the vehicle is equipped with a ramp or not.
                      This is used for buses.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">authorizedPaths</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Paths that the client is authorized to call, e.g. /vehiclestatuses, /vehiclepositions.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />

            <h3 id="twelve-header">Vehicle position API</h3>
            <p>The vehicle position resource is used to get the positions for one or several vehicles.
              The starttime, stoptime & latestOnly parameters can be used to get all historical positions between a start and stop time or the latest known position only.
              The vin parameter can be used to get all historical positions between starttime and stoptime or latest position for one individual vehicle. If the vin parameter isn’t set the response will contain all vehicles the client has access to.
              If a request is made for data in a period where no data has been received, an empty list will be returned.</p>

            <h4 id="thirdteen-header">Response</h4>
            <p>The response object VehiclePositions contains the following. The recommended sources refer to data specified in standards and should normally be used, but equivalent sources are allowed.</p>



            <TableContainer id="thirdteekn-header" >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Reccommended sources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">triggerType</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Indication of the type of trigger that triggered this event. See chapter 9 for trigger definitions.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">requestServerDateTime</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Time to be used to ask for historical data at customers (for starttime), to solve the problem of having different times at server and clients.
                      This is the time at the server when this request was received. To avoid losing any messages or get duplicates, this is the time that should be supplied in the startTime parameter in the next request.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">receivedDateTime</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Reception at Server
                      To be used for handling of “more data available”</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">latitude</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Latitude (WGS84 based)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">longitude</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Longitude (WGS84 based)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">heading</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The direction of the vehicle (0-359)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">altitude</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The altitude of the vehicle</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">speed</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The GNSS (e.g. GPS)-speed in km/h</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">positionDateTime</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The time of the position data</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">createdDateTime</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">When the data was retrieved in the vehicle</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">vin</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">vehicle identification number
                      See ISO 3779 (17 characters)</TableCell>
                    <TableCell align='right'> FMS: Vehicle identification number
                      SAE J1939: SPN 237</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">wheelBasedSpeed</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Wheel-Based Vehicle Speed in km/h (Speed of the vehicle as calculated from wheel or tailshaft speed).</TableCell>
                    <TableCell align="right">FMS: Wheel based speed
                      SAE J1939: SPN 84</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">tachographSpeed</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Tachograph vehicle speed in km/h (Speed of the vehicle registered by the tachograph).</TableCell>
                    <TableCell align="right">FMS: Tachograph vehicle speed
                      SAE J1939: SPN 1624</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">moreDataAvailable</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">This will be set to true if the result set was too large to be sent back in one reply.
                      A new request must be sent to get the rest of the vehicle positions, where the starttime parameter must be supplied.
                      The starttime should be set to the ReceivedDateTime of the last vehicle in the result set of this message.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <h4 id="fourtheen-header">Limitations</h4>
            <p>The refresh rate of data of the vehicle position for each vehicle is at least once every 15 minutes.
              Storage period is minimum 2 weeks from when the position event was received from the vehicle.
              The last received position is always available for the current requests (not available for historical requests if it is outside the storage period).</p>
            <Divider />

            <h3 id="fifteen-header" >Vehicle status API</h3>
            <p>The vehicle status resource is used to get the status reports for one or several vehicles.
              Using the starttime, stoptime & latestOnly parameters it can be used to get all historical status reports between a start and stop time or the latest known status only.
              Using the vin parameter it can be used to get all historical vehicle reports or latest status for one individual vehicle.
              If a request is made for data in a period where no data has been received, an empty list will be returned.</p>
            <h4 id="sixteen-header">Content filter</h4>
            <p>The content filter can be used to limit the data in the response to the requested blocks.</p>
            <h5 id="seventeen-header">Possible values</h5>
            <ul style={{ listStyleType: 'disc' }}>
              <li >ACCUMULATED</li>
              <li>SNAPSHOT</li>
              <li>UPTIME</li>
            </ul>
            <h4 id="eightteen-header">Trigger filter</h4>


            <p>The trigger filter can be used to limit the response to contain only events that are triggered by the specified triggers (E.g. events triggered by a driver login).</p>

            <h5 id="nineteen-header">Possible values</h5>
            <p>The following list of triggers is the ones in the rFMS standard.
              Complementing this list, the different OEMs can also have their own triggers, the list of these can be retrieved by each OEM.</p>
            <ul style={{ listStyleType: 'disc', display: "flex", flexDirection: "row", gap: 32 }} >
              <div>

                <li >TIMER</li>
                <li>TELL_TALE</li>
                <li>DRIVER_LOGIN</li>
                <li>DRIVER_LOGOUT</li>
                <li>IGNITION_ON</li>
                <li>IGNITION_OFF</li>
                <li>ENGINE_ON</li>
              </div>
              <div>
                <li>ENGINE_OFF</li>
                <li>PTO_ENABLED</li>
                <li>PTO_DISABLED</li>
                <li>DISTANCE_TRAVELLED</li>
                <li>DRIVER_1_WORKING_STATE_CHANGED</li>
                <li>DRIVER_2_WORKING_STATE_CHANGED</li>
                <li>FUEL_TYPE_CHANGE</li>
                <li>PARKING_BRAKE_SWITCH_CHANGE</li>
              </div>

            </ul>
            <h4 id="twenty-header">Response</h4>
            <h5 id="twentyOne-header">VehicleStatuses</h5>
            <p>This is the response that will be sent back for a request to the vehicle statuses resource.
              It will contain a list of vehicle statuses matching the filter parameters supplied in the request.
              The recommended sources refer to data specified in standards and should normally be used, but equivalent sources are allowed.</p>


            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Recommended sources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">vin</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">vehicle identification number
                      See ISO 3779 (17 characters)</TableCell>
                    <TableCell align="right">FMS: Vehicle identification number
                      SAE J1939: SPN 237</TableCell>

                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">createdDateTime</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">When the data was generated in the vehicle.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">receivedDateTime</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">When the data was received at the OEM backend systems.</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">hrTotalVehicleDistance</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Accumulated distance travelled by the vehicle during its operation in meter</TableCell>
                    <TableCell align="right">FMS: High resolution total vehicle distance
                      SAE J1939: SPN 917</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">totalEngineHours</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The total hours of operation for the vehicle engine.</TableCell>
                    <TableCell align="right">FMS: Engine total hours of Operation
                      SAE J1939: SPN 247</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">engineTotalFuelUsed</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">The total fuel the vehicle has used during its lifetime in MilliLitres.
                      Either totalFuelUsedGaseous or engineTotalFuelUsed is Mandatory</TableCell>
                    <TableCell align="right">FMS: High resolution engine total fuel used
                      SAE J1939: SPN 5054</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">grossCombinationVehicleWeight</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The full vehicle weight in kg</TableCell>
                    <TableCell align="right">FMS: Gross Combination Vehicle Weight
                      SAE J1939: SPN 1760</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">totalFuelUsedGaseous</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Total fuel consumed (trip drive fuel + trip PTO governor moving fuel + trip PTO governor non-moving fuel + trip idle fuel) over the life of the engine in kg.
                      Either totalFuelUsedGaseous or engineTotalFuelUsed is Mandatory</TableCell>
                    <TableCell align="right">FMS: Total Fuel Used (Gaseous)
                      SAE J1939: SPN 1040</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">driver1Id</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The driver 1 identity</TableCell>
                    <TableCell align="right">FMS: Driver 1 Identification
                      SAE J1939: SPN 1625</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">accumulatedData</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">A list of accumulated vehicle data, see chapter 8.3.2.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">snapshotData</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">A list of snapshot vehicle data, see chapter 8.3.3</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">uptimeData</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">A list of uptime vehicle data, see chapter 8.3.4.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">status2OfDoors</TableCell>
                    <TableCell align="right">M(bus)</TableCell>
                    <TableCell align="right">Composite indication of all bus door statuses.
                      Bus specific parameter</TableCell>
                    <TableCell align="right">FMS: Status 2 of doors
                      SAE J1939: SPN 3411</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">doorStatus</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Bus specific parameter</TableCell>
                    <TableCell align="right">FMS: Status of doors 1-10
                      SAE J1939: SPN 3412-3441</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>


            <h5 id="twentyone-header">Accumulated data</h5>
            <p>The content of the accumulated data block. The mandatory fields for fuel are only mandatory for Diesel engines. The recommended sources refers to data specified in standards and should normally be used, but equivalent sources are allowed.</p>


            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Recommended sources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">durationWheelbaseSpeedOverZero</TableCell>
                    <TableCell align="right">Seconds</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The time the vehicle speed has been over zero.</TableCell>
                    <TableCell align="right">FMS: Wheel based speed SAE J1939: SPN 84</TableCell>

                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">distanceCruiseControlActive</TableCell>
                    <TableCell align="right">Meter</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The distance the vehicle has been driven with cruise control active</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">durationCruiseControlActive</TableCell>
                    <TableCell align="right">Seconds</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The time the vehicle has been driven with cruise control active</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelConsumptionDuringCruiseActive</TableCell>
                    <TableCell align="right">MilliLitres</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The fuel consumption the vehicle has consumed while driven with cruise control active</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">durationWheelbaseSpeedZero</TableCell>
                    <TableCell align="right">Seconds</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The time the vehicle speed has been equal to zero. Engine on (RPM>0) and no PTO active</TableCell>
                    <TableCell align="right">FMS: Wheel based speed, Engine speed, PTO state SAE J1939: SPN 84, SPN 190, SPN 3948</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelDuringWheelbaseSpeedZero</TableCell>
                    <TableCell align="right">MilliLitres</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The fuel consumption the vehicle has consumed while the vehicle speed has been equal to zero. Engine on (RPM>0) and no PTO active</TableCell>
                    <TableCell align="right">FMS: High resolution engine total fuel used
                      SAE J1939: SPN 5054</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelWheelbaseSpeedOverZero</TableCell>
                    <TableCell align="right">MilliLitres</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The fuel consumption the vehicle has consumed while the vehicle speed has been over zero. Engine on (RPM>0)</TableCell>
                    <TableCell align="right">FMS: Wheel based speed, Engine speed SAE J1939: SPN 84, SPN 190</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">ptoActiveClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">2 labels:
Wheel based speed > 0 and at least one PTO active Counters for duration (seconds) and consumption (millilitres) Note: Includes consumption of driving
                      wheel based speed = 0 and at least one PTO active Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Wheel based speed, PTO state SAE J1939: SPN 84, SPN 3948</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">brakePedalCounterSpeedOverZero</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The total number of times the brake pedal has been used while the vehicle was driving.</TableCell>
                    <TableCell align="right">FMS: Brake pedal position, Wheel based speed SAE J1939: SPN 521, SPN 84</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">distanceBrakePedalActiveSpeedOverZero</TableCell>
                    <TableCell align="right">Meter</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The total distance the vehicle has driven where the brake pedal has been used.</TableCell>
                    <TableCell align="right">FMS: Brake pedal position, Wheel based speed SAE J1939: SPN 521, SPN 84</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">snapshotData</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 5 intervals in percent (%): [0, 20[ [20, 40[ [40, 60[ [60, 80[ [80, 100]
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Brake pedal position, Wheel based speed SAE J1939: SPN 521, SPN 84</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">accelerationPedalPositionClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 5 intervals in percent (%): [0, 20[ [20, 40[ [40, 60[ [60, 80[ [80, 100]
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Accelerator pedal position 1 SAE J1939: SPN 91</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">brakePedalPositionClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Minimum 5 intervals in percent (%): [0, 20[ [20, 40[ [40, 60[ [60, 80[ [80, 100]
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Brake pedal position SAE J1939: SPN 521</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">accelerationClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 13 intervals in m/s2 ], -1.1] ]-1.1, -0.9] ]-0.9, -0.7] ]-0.7, -0.5] ]-0.5, -0.3] ]-0.3, -0.1] ]-0.1, 0.1[ [0.1, 0.3[ [0.3, 0.5[ [0.5, 0.7[ [0.7, 0.9[ [0.9, 1.1[ [1.1, [
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">retarderTorqueClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 5 intervals in percent (%): ]0, 20[ [20, 40[ [40, 60[ [60, 80[ [80, 100]
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
                      Note: How the retarder is used as a positive value</TableCell>
                    <TableCell align="right">MS: Actual Retarder - Percent Torque SAE J1939: SPN 520</TableCell></TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">HighAccelerationInClasses</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Minimum 11 intervals in m/s2: ], -3.0] ]-3.0, -2.5] ]-2.5, -2.0] ]-2.0, -1.5] ]-1.5, -1.1] ]-1.1, 1.1[ [1.1, 1.5[ [1.5, 2.0[ [2.0, 2.5[ [2.5, 3.0[ [3.0, [
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">drivingWithoutTorqueClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">1 label: Driving without torque.
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
                      Note: With gear (clutch is engaged)</TableCell>
                    <TableCell align="right">FMS: Actual Engine – Percent Torque, Clutch switch, Current Gear
                      SAE J1939: SPN 513, SPN 598, SPN 523</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">engineTorqueClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 10 intervals in percent (%): [0, 10[ [10, 20[ [20, 30[ [30, 40[ [40, 50[ [50, 60[ [60, 70[ [70, 80[ [80, 90[ [90, 100]
                      Counters for duration (seconds),consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Actual Engine – Percent Torque
                      SAE J1939: SPN 513</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">engineTorqueAtCurrentSpeedClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Minimum 10 intervals in percent (%): [0, 10[ [10, 20[ [20, 30[ [30, 40[ [40, 50[ [50, 60[ [60, 70[ [70, 80[ [80, 90[ [90, 100]
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)</TableCell>
                    <TableCell align="right">FMS: Engine Percent Load At Current Speed
                      SAE J1939: SPN 92</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">vehicleSpeedClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 40 intervals in km/h: [0, 4[ [4, 8[ [8, 12[ [12, 16[ [16, 20[ [20, 24[ ... [156, [
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
Note: Engine on (RPM>0)</TableCell>
                    <TableCell align="right">FMS: Wheel based speed, Engine speed
                      SAE J1939: SPN 84, SPN 190</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">engineSpeedClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Minimum 10 intervals in rpm: [0, 400[ [400, 800[ [800, 1200[ [1200, 1600[ [1600, 2000[ [2000, 2400[ [2400, 2800[ [2800, 3200[ [3200, 3600[ [3600, [
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
Note: Engine on (RPM>0)</TableCell>
                    <TableCell align="right">FMS: Engine speed
                      SAE J1939: SPN 190</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">accelerationDuringBrakeClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Minimum 13 intervals in m/s2: ], -1.1] ]-1.1, -0.9] ]-0.9, -0.7] ]-0.7, -0.5] ]-0.5, -0.3] ]-0.3, -0.1] ]-0.1, 0.1[ [0.1, 0.3[ [0.3, 0.5[ [0.5, 0.7[ [0.7, 0.9[ [0.9, 1.1[ [1.1, [
                      Counters for duration (seconds), consumption (millilitres) and distance (meters))</TableCell>
                    <TableCell align="right">FMS: Brake pedal position SAE J1939: SPN 521</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">selectedGearClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">One label per selected gear, provided as a signed integer.
                      Negative values are reverse gears. Positive values are forward gears 0 – Neutral 251 – Park
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
                      This is used for buses</TableCell>
                    <TableCell align="right">FMS: Selected Gear
                      SAE J1939: SPN 524</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">currentGearClass</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">One label per current gear, provided as a signed integer.
                      Negative values are reverse gears. Positive values are forward gears 0 – Neutral 251 – Park
                      Counters for duration (seconds), consumption (millilitres) and distance (meters)
                      This is used for buses</TableCell>
                    <TableCell align="right">FMS: Current Gear
                      SAE J1939: SPN 523</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">chairliftCounter</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The total number of times the chairlift has been outside the bus. This is used for buses</TableCell>
                    <TableCell align="right">FMS: Ramp/Wheel chairlift
                      SAE J1939: SPN 18203</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">stopRequestCounter</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The total number of stop requests made.
                      This is used for buses</TableCell>
                    <TableCell align="right">FMS: Telltale Stop Request</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">kneelingCounter</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The total number of times the bus has knelt.</TableCell>
                    <TableCell align="right">FMS: Telltale Kneeling</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">pramRequestCounter</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The total number of pram requests made. This is used for buses</TableCell>
                    <TableCell align="right">FMS: Telltale Pram request</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
            <h6 id="twentytwo-header">Class parameters</h6>
            <p>A class parameter can be defined using labels or intervals. The class parameter values (time, distance and consumption) are incremented continuously whenever the condition of the label is fulfilled or the measured parameter is within the defined interval.
              Note: Reset is depending on OEM and can be done e.g. in case of changing the owner of the vehicle. The starting point of the class parameters are OEM specific.
              A class parameter defined using labels is fixed, i.e. the labels are defined in this standard.
              A class parameter defined using intervals, is divided into a minimum set of intervals. Each such interval can be further divided into subintervals, still allowing for aggregation of these back into the minimum set of defined intervals. It is however not allowed to define intervals that are spanning the defined intervals. The table below shows two examples of interval definitions that are OK and one example that is not OK.</p>
            <img src={parameters} style={{ minWidth: "200px", position: "center" }} />
            <h6 id="twentythree-header">Interval definition</h6>
            <p>The minimum set of intervals is represented using a bracket notation indicating if a value is part of the block or not. Considering this interval definition with a set of 7 intervals,
              ], -2] ]-2, -1] ]-1, -0.1] ]-0.1, 0.1[ [0.1, 1[ [1, 2[ [2, [
              it would mean the following: </p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Interval</TableCell>
                    <TableCell align="right">Mathematical</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">], -2]</TableCell>
                    <TableCell align="right">{"value <= -2"}</TableCell>
                    <TableCell align="right">value is below -2 (-2 is included)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">]-2, -1]]</TableCell>
                    <TableCell align="right">{"-2 < value <= -1"}</TableCell>
                    <TableCell align="right">value is between -2 and -1 (-2 is not included, -1 is included)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">]-1, -0.1]</TableCell>
                    <TableCell align="right">{"-1 < value <= 0.1"}</TableCell>
                    <TableCell align="right">value is between -1 and -0.1 (-1 is not included, -0.1 is included)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">]-0.1, 0.1[</TableCell>
                    <TableCell align="right">{"-0.1 < value < 0.1"}</TableCell>
                    <TableCell align="right">value is between -0.1 and 0.1 (-0.1 is not included, 0.1 is not included)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">[0.1, 1[</TableCell>
                    <TableCell align="right">{"0.1 <= value < 1"}</TableCell>
                    <TableCell align="right">value is between 0.1 and 1 (0.1 is included, 1 is not included)</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">[1, 2[</TableCell>
                    <TableCell align="right">{"1 <= value < 2"}</TableCell>
                    <TableCell align="right">value is between 1 and 2 (1 is included, 2 is not included)</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">[2,[</TableCell>
                    <TableCell align="right">{"2 <= value"}</TableCell>
                    <TableCell align="right">value is above 2 (2 is included)</TableCell>
                  </TableRow>
                </TableBody></Table></TableContainer>
            <p>If we exemplify this with receiving this list of durations in seconds (7 values):
              40, 10, 20, 2000, 30, 31, 60
              The vehicle would have spent:
              40 seconds below (and including) -2 10 seconds between -1.99999… and -1 20 seconds between -0.99999… and -0.1 2000 seconds between -0.099999… and 0.099999… 30 seconds between 0.1 and 0.99999… 31 seconds between 1 and 1.99999… 60 seconds above (and including) 2</p>
            <h6 id="twentythree-header">Class parameter examples</h6>
            <p>Here are two examples of class parameters, one defined by labels and one with intervals.
              ptoActiveClass is a class parameter defined by two labels.
              This is an example of how it could be returned.</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Wheel based speed = 0</TableCell>
                    <TableCell align="right">Wheel based speed > 0</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Duration (seconds)</TableCell>
                    <TableCell align="right">345345</TableCell>
                    <TableCell align="right">9585</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Distance (meters)</TableCell>
                    <TableCell align="right">75934579</TableCell>
                    <TableCell align="right">456456</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Consumption (milliliters)</TableCell>
                    <TableCell align="right">345345</TableCell>
                    <TableCell align="right">9585</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <p>accelerationPedalPositionClass is a class parameter defined by intervals.
              This is an example of how it could be returned. 0-20 % 20-40</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">0-20 %</TableCell>
                    <TableCell align="right">20-40 %</TableCell>
                    <TableCell align="right">40-60 %</TableCell>
                    <TableCell align="right">60-80 %</TableCell>
                    <TableCell align="right">80-100 %</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Duration (seconds)</TableCell>
                    <TableCell align="right">93475</TableCell>
                    <TableCell align="right">4058</TableCell>
                    <TableCell align="right">345345</TableCell>
                    <TableCell align="right">854</TableCell>
                    <TableCell align="right">849</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Distance (meters)</TableCell>
                    <TableCell align="right">457397</TableCell>
                    <TableCell align="right">79779</TableCell>
                    <TableCell align="right">97987</TableCell>
                    <TableCell align="right">779</TableCell>
                    <TableCell align="right">977</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">Consumption (milliliters)</TableCell>
                    <TableCell align="right">87979</TableCell>
                    <TableCell align="right">79797</TableCell>
                    <TableCell align="right">98797</TableCell>
                    <TableCell align="right">7798</TableCell>
                    <TableCell align="right">9780</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>


            <h5 id="twentyfour-header">Snapshot data</h5>
            <p>
              The content of the snapshot data block. The mandatory fields for fuel are only mandatory for Diesel engines. The recommended sources refer to data specified in standards and should normally be used, but equivalent sources are allowed.
            </p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Recommended sources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">latitude</TableCell>
                    <TableCell align="right">WGS84</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Latitude</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">longitude</TableCell>
                    <TableCell align="right">WGS84</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">Longitude</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">heading</TableCell>
                    <TableCell align="right">Degrees</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The direction of the vehicle (0-359)</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">altitude</TableCell>
                    <TableCell align="right">meter</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The altitude of the vehicle</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">speed</TableCell>
                    <TableCell align="right">km/h</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The GNSS (e.g. GPS)-speed in km/h</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">positionDateTime</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The time of the position data</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">wheelBasedSpeed</TableCell>
                    <TableCell align="right">Km/h</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The vehicle wheelbased speed</TableCell>
                    <TableCell align="right">FMS: Wheel based speed
                      SAE J1939: SPN 84</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">tachographSpeed</TableCell>
                    <TableCell align="right">Km/h</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The Tacho speed</TableCell>
                    <TableCell align="right">FMS: Tachograph vehicle speed
                      SAE J1939: SPN 1624</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">engineSpeed</TableCell>
                    <TableCell align="right">rpm</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The engine speed in rev/min</TableCell>
                    <TableCell align="right">FMS: Engine speed
                      SAE J1939: SPN 190</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelType</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Type of fuel currently being utilized by the vehicle acc. SPN 5837</TableCell>
                    <TableCell align="right">FMS: Fuel Type
                      SAE J1939: SPN 5837</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelLevel1</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">The fuel level percentage</TableCell>
                    <TableCell align="right">FMS: Fuel Level 1
                      SAE J1939: SPN 96</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">fuelLevel2</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Ratio of volume of fuel to the total volume of fuel storage container, in percent When Fuel Level 2 is not used, Fuel Level 1 represents the total fuel in all fuel storage containers. When Fuel Level 2 is used, Fuel Level 1 represents the fuel level in the primary or left-side fuel storage container.</TableCell>
                    <TableCell align="right">FMS: Fuel Level 2
                      SAE J1939: SPN 38</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">catalystFuelLevel</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The adblue level percentage</TableCell>
                    <TableCell align="right">FMS: Aftertreatment 1 Diesel Exhaust Fluid Tank 1 Level
                      SAE J1939: SPN 1761</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">driver1WorkingState</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The working state of driver 1</TableCell>
                    <TableCell align="right">FMS: driver 1 working state
                      SAE J1939: SPN 1612</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">driver2Id</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The Id of driver 2</TableCell>
                    <TableCell align="right">FMS: Driver 2 Identification
                      SAE J1939: SPN 1626</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">driver2WorkingState</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The working state of driver 2</TableCell>
                    <TableCell align="right">FMS: driver 2 working state
                      SAE J1939: SPN 1613</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>


                    <TableCell align="right">parkingBrakeSwitch</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Switch signal which indicates when the parking brake is set. In general, the switch actuated by the operator's park brake control, whether a pedal, lever or other control mechanism.</TableCell>
                    <TableCell align="right">FMS: Parking Brake Switch
                      SAE J1939: SPN 70</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">hybridBatteryPackRemainingCharge</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">Indicates the hybrid battery pack remaining charge. 0% means no charge remaining, 100% means full charge remaining.</TableCell>
                    <TableCell align="right">FMS: Hybrid Battery Pack Remaining Charge
                      SAE J1939: SPN 5464</TableCell>

                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">ambientAirTemperature</TableCell>
                    <TableCell align="right">Degrees Celsius</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The Ambient air temperature in Celsius</TableCell>
                    <TableCell align="right">FMS: Ambient Air Temperature
                      SAE J1939: SPN 171</TableCell>

                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <h6 id="twentyfive-header">Driver Id</h6>
            <p>The id of the driver.
              The Id can either be an EU tacho driver id or an OEM specific driver Id.</p>

            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">TachoDriverIdentification</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The EU standard driver tachograph id.</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">OemDriverIdentification</TableCell>
                    <TableCell align="right">String</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">An OEM specific driver id.</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">IdType</TableCell>
                    <TableCell align="right">String</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">It can also contain an optional id type (ex: pin, USB, encrypted EU id…)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <h6 id="twentysix-header">TachoDriverIdentificationType</h6>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">TachoDriverIdentificationType</TableCell>
                    <TableCell align="right">The EU standard driver tachograph id.
                      The fields in this struct are formatted according to:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b
                      http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2002:207:0001:0252:EN:PDF</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">DriverIdentification</TableCell>
                    <TableCell align="right">The unique identification of a driver in a Member State.
                      This fields is formatted according the definition for driverIdentification in:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">CardIssuingMemberState</TableCell>
                    <TableCell align="right">The country alpha code of the Member State having issued the card.
                      This fields is formatted according the definition for NationAlpha in:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">DriverAuthenticationEquipment</TableCell>
                    <TableCell align="right">Code to distinguish different types of equipment for the tachograph application.
                      See description of the field 'DriverAuthenticationEquipment' in:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">CardReplacementIndex</TableCell>
                    <TableCell align="right">A card replacement index.
                      This fields is formatted according the definition for CardReplacementIndex (chap 2.26) in:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">CardRenewalIndex</TableCell>
                    <TableCell align="right">A card renewal index.
                      This fields is formatted according the definition for CardRenewalIndex (chap 2.25) in:
                      COMMISSION REGULATION (EC) No 1360/2002 Annex 1b</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <h6 id="twentyseven-header">Uptime data</h6>
            <p>The content of the uptime data block. The recommended sources refer to data specified in standards and should normally be used, but equivalent sources are allowed to be used.</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Recommended sources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">tellTaleInfo</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">List of tell tales with the actual status for each tell tale.</TableCell>
                    <TableCell align="right">See 8.3.4.1 for definitions
                      SAE J1939: PGN 64893</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">serviceDistance</TableCell>
                    <TableCell align="right">Meter</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The distance in meter to the next service</TableCell>
                    <TableCell align="right">FMS: Service distance
                      SAE J1939: SPN 914</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">engineCoolantTemperature</TableCell>
                    <TableCell align="right">Celsius</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The temperature of the coolant liquid.</TableCell>
                    <TableCell align="right">FMS: Engine coolant temperature
                      SAE J1939: SPN 110</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">serviceBrakeAirPressureCircuit1</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The air pressure in circuit 1 in Pascal.</TableCell>
                    <TableCell align="right">FMS: Service Brake Air Pressure Circuit #1
                      SAE J1939: SPN 1087</TableCell>
                  </TableRow>  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">serviceBrakeAirPressureCircuit2</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The air pressure in circuit 2 in Pascal.</TableCell>
                    <TableCell align="right">FMS: Service Brake Air Pressure Circuit #2
                      SAE J1939: SPN 1088</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">durationAtLeastOneDoorOpen</TableCell>
                    <TableCell align="right">Seconds</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The total time at least one door has been opened in the bus.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Position of doors
                      SAE J1939: SPN 1821</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">alternatorStatus</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">M(bus)</TableCell>
                    <TableCell align="right">The alternator status of the up to 4 alternators.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Alternator Status 1-4
                      SAE J1939: SPN 3353-3356</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">bellowPressureFrontAxleLeft</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The bellow pressure in the front axle left side in Pascal.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Bellow Pressure Front Axle Left
                      SAE J1939: SPN 1725</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">bellowPressureFrontAxleRight</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The bellow pressure in the front axle right side in Pascal.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Bellow Pressure Front Axle Left
                      SAE J1939: SPN 1726</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">bellowPressureRearAxleLeft</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The bellow pressure in the rear axle left side in Pascal.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Bellow Pressure Front Axle Left
                      SAE J1939: SPN 1727</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">bellowPressureRearAxleRight</TableCell>
                    <TableCell align="right">Pascal</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">The bellow pressure in the rear axle right side in Pascal.
                      Used for buses.</TableCell>
                    <TableCell align="right">FMS: Bellow Pressure Front Axle Left
                      SAE J1939: SPN 1728</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <h6 id="twentyeight-header">Telltales</h6>
            <p>The table below lists the telltales defined in rFMS. The telltale information is derived from information displayed to the driver’s dashboard. The telltale number is related to the description in the ISO 7000 document. The telltales not related to ISO 7000 are stated with “-”. There are 8 possible states: Red, Yellow, Info, Off, Reserved 4-6, Not available. The interpretation of the state is manufacturer dependent and might be different. For details please refer to the manufacturers’ document. The symbols used in the dash display of each manufacturer might vary from ISO symbols.</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">FMS id</TableCell>
                    <TableCell align="right">Telltale</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Based on ISO 7000 number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">Cooling air conditioning</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">27</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">2</TableCell>
                    <TableCell align="right">High beam, main beam</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">82</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">Low beam, dipped beam</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">83</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">4</TableCell>
                    <TableCell align="right">Turn signals</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">84</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">5</TableCell>
                    <TableCell align="right">Hazard warning</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">85</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">6</TableCell>
                    <TableCell align="right">Provision for the disabled or handicapped persons</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">100</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">7</TableCell>
                    <TableCell align="right">Parking Brake</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">238</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">8</TableCell>
                    <TableCell align="right">Brake failure/brake system malfunction</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">239</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">9</TableCell>
                    <TableCell align="right">Hatch open</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">242</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">10</TableCell>
                    <TableCell align="right">Fuel level</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">245</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">11</TableCell>
                    <TableCell align="right">Engine coolant temperature</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">246</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">12</TableCell>
                    <TableCell align="right">Battery charging condition</TableCell>
                    <TableCell align="right">M (bus)</TableCell>
                    <TableCell align="right">247</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">13</TableCell>
                    <TableCell align="right">Engine oil</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">248</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">14</TableCell>
                    <TableCell align="right">Position lights, side lights</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">456</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">15</TableCell>
                    <TableCell align="right">Front fog light</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">633</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">16</TableCell>
                    <TableCell align="right">Rear fog light</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">634</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">17</TableCell>
                    <TableCell align="right">Park Heating</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">637</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">18</TableCell>
                    <TableCell align="right">Engine / Mil indicator</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">640</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">19</TableCell>
                    <TableCell align="right">Service, call for maintenance</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">717</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">20</TableCell>
                    <TableCell align="right">Transmission fluid temperature</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">1168</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">21</TableCell>
                    <TableCell align="right">Transmission failure/malfunction</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">1396</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">22</TableCell>
                    <TableCell align="right">Anti-lock brake system failure</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">1407</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">23</TableCell>
                    <TableCell align="right">Worn brake linings</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">1408</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">24</TableCell>
                    <TableCell align="right">Windscreen washer fluid/windshield washer fluid</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">1422</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">25</TableCell>
                    <TableCell align="right">Tire failure/malfunction</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">1434</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">26</TableCell>
                    <TableCell align="right">Malfunction/general failure</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">1603</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">27</TableCell>
                    <TableCell align="right">Engine oil temperature</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">2426</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">28</TableCell>
                    <TableCell align="right">Engine oil level</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">2427</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">29</TableCell>
                    <TableCell align="right">Engine coolant level</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">2429</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">30</TableCell>
                    <TableCell align="right">Steering fluid level</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2440</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">31</TableCell>
                    <TableCell align="right">Steering failure</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2441</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">32</TableCell>
                    <TableCell align="right">Height Control (Levelling)</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2461</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">33</TableCell>
                    <TableCell align="right">Retarder</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2574</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">34</TableCell>
                    <TableCell align="right">Engine Emission system failure (Mil indicator)</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">2596</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">35</TableCell>
                    <TableCell align="right">ESC indication</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2630</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">36</TableCell>
                    <TableCell align="right">Brake lights</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">37</TableCell>
                    <TableCell align="right">Articulation</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">38</TableCell>
                    <TableCell align="right">Stop Request</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">39</TableCell>
                    <TableCell align="right">Pram Request</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">40</TableCell>
                    <TableCell align="right">Bus stop brake</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">41</TableCell>
                    <TableCell align="right">AdBlue level</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2946</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">42</TableCell>
                    <TableCell align="right">Raising</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">43</TableCell>
                    <TableCell align="right">Lowering</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">44</TableCell>
                    <TableCell align="right">Kneeling</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">45</TableCell>
                    <TableCell align="right">Engine compartment temperature</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">46</TableCell>
                    <TableCell align="right">Auxiliary air pressure</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">47</TableCell>
                    <TableCell align="right">Air filter clogged</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2432</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">48</TableCell>
                    <TableCell align="right">Fuel filter differential pressure</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2452</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">49</TableCell>
                    <TableCell align="right">Seat belt</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">249</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">50</TableCell>
                    <TableCell align="right">EBS</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">51</TableCell>
                    <TableCell align="right">Lane departure indication</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2682</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">52</TableCell>
                    <TableCell align="right">Advanced emergency braking system</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">53</TableCell>
                    <TableCell align="right">ACC</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2581</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">54</TableCell>
                    <TableCell align="right">Trailer connected</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">55</TableCell>
                    <TableCell align="right">ABS Trailer 1,2</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2444/2445</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">56</TableCell>
                    <TableCell align="right">Airbag</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2108</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">57</TableCell>
                    <TableCell align="right">EBS Trailer 1,2</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">58</TableCell>
                    <TableCell align="right">Tachograph indication</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">59</TableCell>
                    <TableCell align="right">ESC switched off</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2649</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">60</TableCell>
                    <TableCell align="right">Lane departure warning switched off</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">61</TableCell>
                    <TableCell align="right">Engine emission filter (Soot Filter)</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2433</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">62</TableCell>
                    <TableCell align="right">Electric motor failures</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">2633</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">63</TableCell>
                    <TableCell align="right">AdBlue tampering</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">64</TableCell>
                    <TableCell align="right">Multiplex System</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>


                </TableBody>
              </Table>
            </TableContainer>


            <h4 id="twentynine-header">Limitations</h4>
            <p>The refresh rate of data of the vehicle status reports for each vehicle is at least once every 60 minutes.
              Storage period is minimum 2 weeks from when the vehicle status event was received from the vehicle. The last received vehicle status event is always available for the current requests (not available for historical requests if it is outside the storage period)</p>
            <h3 id="thertyy-header">Triggers</h3>
            <p>The triggers that can be used for triggering of positions or vehicle statuses events. In addition to the trigger the mandatory fields will contain information.</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>

                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Context</TableCell>
                    <TableCell align="right">M/O</TableCell>
                    <TableCell align="right">Mandatory fields</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to a timer trigger.
                      (Timer value set outside rFMS scope)</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Ignition on</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to an ignition on</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Ignition off</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to an ignition off</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">PTO enabled</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">None or ptoId</TableCell>
                    <TableCell align="right">Data was sent due to a PTO being enabled, will be sent for each enabled PTO</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">PTO disabled</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">None or ptoId</TableCell>
                    <TableCell align="right">Data was sent due to a PTO being disabled, will be sent for each disabled PTO</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Driver login</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">driverId</TableCell>
                    <TableCell align="right">Data was sent due to a successful driver login</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Driver logout</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">driverId</TableCell>
                    <TableCell align="right">Data was sent due to a driver logout</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Tell tale</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">M</TableCell>
                    <TableCell align="right">tellTaleInfo</TableCell>
                    <TableCell align="right">Data was sent due to at least one tell tale changing state</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Engine on</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to an engine on</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Engine off</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to an engine off</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Driver 1 working state change</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">driverId</TableCell>
                    <TableCell align="right">Data was sent due to driver 1 changing working state</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Driver 2 working state change</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">driverId</TableCell>
                    <TableCell align="right">Data was sent due to driver 2 changing working state</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Distance travelled</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to a set distance being travelled</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Fuel Type change</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to a change in the type of fuel being utilized by the vehicle</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">Parking brake switch change</TableCell>
                    <TableCell align="right">rFMS</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">none</TableCell>
                    <TableCell align="right">Data was sent due to a change in the parking brake state</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">OEM defined</TableCell>
                    <TableCell align="right">OEM brand</TableCell>
                    <TableCell align="right">O</TableCell>
                    <TableCell align="right">OEM specific</TableCell>
                    <TableCell align="right">OEM specific trigger</TableCell>
                  </TableRow>

                </TableBody></Table>
            </TableContainer>
            {/* <h4 id="therty-header">Tell tale triggers</h4>
            <p>These are the tell tales possible in the rFMS API.
For the triggers, only the any -> red and red -> any transitions are mandatory.</p>
            <h5 id="thertyone-header">Trucks</h5>
            <p>The following tell tales are mandatory as triggers for trucks:</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">FMS Id</TableCell>
                    <TableCell align="right">Tell tale description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">8</TableCell>
                    <TableCell align="right">Brake failure/brake system malfunction</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">13</TableCell>
                    <TableCell align="right">Engine oil</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">18</TableCell>
                    <TableCell align="right">Engine / Mil indicator</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">22</TableCell>
                    <TableCell align="right">Anti-lock brake system failure</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">26</TableCell>
                    <TableCell align="right">Malfunction/general failure</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">34</TableCell>
                    <TableCell align="right">Engine Emission system failure</TableCell>
                  </TableRow>
                </TableBody></Table></TableContainer>

            <h5 id="thertytwo-header">Busses and Coaches</h5>
            <p>The following tell tales are mandatory as triggers for busses:</p>
            <TableContainer>
              <Table sx={{ minWidth: 650, maxWidth: 400 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">FMS Id</TableCell>
                    <TableCell align="right">Tell tale description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">8</TableCell>
                    <TableCell align="right">Brake failure/brake system malfunction</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">12</TableCell>
                    <TableCell align="right">Battery charging condition</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">13</TableCell>
                    <TableCell align="right">Engine oil</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">18</TableCell>
                    <TableCell align="right">Engine / Mil indicator</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">22</TableCell>
                    <TableCell align="right">Anti-lock brake system failure</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">26</TableCell>
                    <TableCell align="right">Malfunction/general failure</TableCell>
                  </TableRow><TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">34</TableCell>
                    <TableCell align="right">Engine Emission system failure</TableCell>
                  </TableRow>
                </TableBody></Table></TableContainer>*/}
          </main>

        </div>
      </Box>
    </div >
  )
};

export default Documenantion;
