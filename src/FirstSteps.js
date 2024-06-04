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

const FirstSteps = () => {


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

            <h3 id="initial-header"> Authentication</h3>

            <p>This document specifies how a client is granted access to rFMS APIs. The authorization flows specified are fully compliant the OAuth 2.0 Authorization Framework as defined in RFC 6749. Both this and RFC 6749 are needed to implement a compliant authorization solution.
              It is assumed that the reader understands OAuth 2.0 and its different grant types.
              All paths in this document are relative, i.e. the offering party can choose to prepend with any host and path for the complete URI, i.e. relative path “/token” becomes “https://oem.com/path/token”.</p>
            <h3 id="second-header">Overview</h3>
            <p>
              Number of steps need to be completed before the client can call the resource server to access the rFMS API. First the resource owner and its vehicles need to be registered at the offering party. Secondly the client needs to be registered at the offering party. Finally, the resource owner can grant access to the rFMS API to the client.The authorization server returns an access token.
            </p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">access_token</TableCell>
                    <TableCell align="right">Shall be a JWT formatted token,</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">token_type</TableCell>
                    <TableCell align="right">Shall be “Bearer”</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">expires_in</TableCell>
                    <TableCell align="right">Shall be the lifetime in seconds for the access token</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <h3 id="third-header">Tokens</h3>
            <p>A token is a piece of data that is sent to the offering party with every request from the client. The role of the token is to give a client access to a resource owner’s data, which is held by the offering party. The resource owner can decide what data can be provided to the Client.
              All tokens used by rFMS shall be JWT tokens according to RFC 7519. Mandatory JWT content is defined in this document. </p>


            <h5 id="fifth-header">Access token</h5>
            <p>he access token is a standard JSON Web Token (JWT).
              The payload should be designed to be compact to reduce the amount of data being transmitted.</p>
            <h6 id="sixt-header">Header</h6>
            <p>
              The access token header contains the signature algorithm
              "typ":"JWT",
              "alg":"ES256"            </p>
            <TableContainer >
              <Table sx={{ minWidth: 650, maxWidth: 300 }} component={Paper} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell>Mandatory</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">typ</TableCell>
                    <TableCell align="right">Yes</TableCell>
                    <TableCell align="right">Token type</TableCell>
                    <TableCell align="right">Shall be "JWT"</TableCell>
                  </TableRow> <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="right">alg</TableCell>
                    <TableCell align="right">Yes</TableCell>
                    <TableCell align="right">Algorithm used to create the signature</TableCell>
                    <TableCell align="right">Examples: ES256, HS512, RS512
                      Valid values can be found in RFC 7518
                      Note: Signing is mandatory, i.e. none is not allowed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <ul style={{ listStyleType: 'disc', fontWeight: "bold" }}>
              <li >HTTP header field: Authorization</li>
              <li>Format: Bearer [access token]</li>
            </ul>
            <p>Example:
              Authorization: Bearer QWxhZG.RpbjpvcGVuIHNl.c2FtZQ==</p>
          </main>

        </div>
      </Box>
    </div >
  )
};

export default FirstSteps;
