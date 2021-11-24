import React from "react";
import "./Styles/index.css"
import theme from "./StyledComponents/theme";
import { ThemeProvider } from "@mui/material";
import WeatherStations from "./WeatherStations";
import Weather from "./Weather";
import Navbar from "./Navigation";

import { Routes, Route} from "react-router-dom";


const NoMatch = () =>{
  return(
    <div>
      <h1>No page found</h1>
    </div>
  )
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Weather/>} />
        <Route path="/weatherStations" element={<WeatherStations/>} />
        <Route path="*" element={<NoMatch/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
