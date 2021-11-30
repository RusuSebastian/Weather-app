import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Routes, Route} from "react-router-dom";
import Navbar from './Components/Navigation';
import Weather from './Components/Weather';
import WeatherStations from './Components/WeatherStations';
import theme from "./StyledComponents/Theme";
import "./Styles/index.css"

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
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/WeatherStations" element={<WeatherStations/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
