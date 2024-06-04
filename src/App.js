import React from "react"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "../src/Home"
import Vehicle from "../src/Vehicles"
import Documentation from "../src/Documentation"
import FirstSteps from "../src/FirstSteps";
function App() {
  return (

      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="apis/:api" element={<Vehicle />} />

          <Route path="documentation" element={<Documentation />} />
          <Route path="firstSteps" element={<FirstSteps />} />

        </Routes></Router>
  )
}
export default App;
