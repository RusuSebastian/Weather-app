import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import "./Styles/index.css"


if(localStorage.getItem("stations")===null){
    localStorage.setItem("stations",JSON.stringify([]));
}

const WeatherStations = () =>{
    const navigate = useNavigate();
    
    const [localData,getLocalData] =useState<any>([]);
    const[state,setState]= useState<any>(
        {
          id:Math.floor(Math.random() * 99999),
          city:"",
          latitude:"",
          longitude:"",
          altitude:""
          
        }
      );

    useEffect(() => {
         const data=JSON.parse(localStorage.getItem("stations"));
         getLocalData(data);
     }, []);

    const handleInputChange = (event: { target: any; }) => {
        const target = event.target;
        const name = target.id;
        const value =  target.value;
        setState((prevState: any) => ({...prevState, [name]: value}));
      };

    function toggleForm(){
        document.querySelector("form").classList.toggle("invisible");
    }

    function removeStation(event: { target: any; }){
        const item=event.target;
        if(item.classList[0] === "MuiSvgIcon-root"){
            const station=item.parentElement.parentElement;
            const stationIndex=[...station.parentElement.childNodes];

            let stations;
            if(localStorage.getItem("stations") === null){
                stations = [];
            }else {
                stations = JSON.parse(localStorage.getItem("stations"))
            }
            stations.splice(stationIndex.indexOf(station),1);
            localStorage.setItem("stations", JSON.stringify(stations));
            station.remove();
            if(stations.length === 0 ){
                navigate("/weatherStations");
            }

        }
        
        
    }

    function handleSubmit (e: { preventDefault: () => void; }) {
        e.preventDefault();
        localData.push({
          id:state.id,
          city:state.city,
          latitude:state.latitude,
          longitude:state.longitude,
          altitude:state.altitude
        })
        localStorage.setItem("stations",JSON.stringify(localData));
        toggleForm();
        navigate("/weatherStations");
      }
return(
    <div className="weather-stations-container">
        <form onSubmit={handleSubmit} className="invisible">
            <TextField
                id="city"
                label="City"
                onChange={handleInputChange}
                required
                size="small"
            />
            <TextField
                helperText="(between -90 and 90)"
                id="latitude"
                label="Latitude"
                onChange={handleInputChange}
                type="number"
                min="-90"
                max="90"
                required
                size="small"
            />
            <TextField
                helperText="(between -180 and 180)"
                id="longitude"
                label="Longitude"
                onChange={handleInputChange}
                type="number"
                min="-180"
                max="180"
                required
                size="small"
            />
            <TextField
                id="altitude"
                label="Altitude"
                onChange={handleInputChange}
                type="number"
                required
                size="small"
            />
            <Button 
            type="submit"
            variant ="contained"
            size="small"
            >
                Save
            </Button>
        </form>
        <div className="add-station">
            <Button size="small"  color="secondary" variant ="contained"  onClick={(e) => toggleForm()} >+ Add a station</Button>
        </div>
        {(localData.length !== 0) ? (

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Altitude</th>
                    </tr>
                </thead>
                <tbody>
                     {localData.map( (data: { city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; latitude: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; longitude: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; altitude: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; },key: React.Key | null | undefined) => (
                        <tr key={key}>
                            <td>{data.city}</td>
                            <td>{data.latitude}</td>
                            <td>{data.longitude}</td>
                            <td>{data.altitude}</td>
                            <td><DeleteOutlinedIcon onClick={removeStation}/></td>
                        </tr>
                    ))}
                            
                </tbody>
            </table>
        ):(
            <p className="placeholder">Your weather stations will be listed here</p>
        )}
        

        

    </div>
);
}

export default WeatherStations