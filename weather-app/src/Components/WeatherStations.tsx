import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const WeatherStations = () =>{
    if(localStorage.getItem("stations")===null){
        localStorage.setItem("stations",JSON.stringify([]));
    }
    const navigate = useNavigate();
    const [formIsActive,setFormIsActive]=useState<boolean>(true);
    const [localData,setLocalData] =useState<any>([]);
    const[infoForm,setInfoForm]= useState<any>(
        { 
          city:"",
          latitude:"",
          longitude:"",
          altitude:""
        }
      );
    useEffect(() => {
        const data=JSON.parse(localStorage.getItem("stations") || "");
        setLocalData(data);
    }, []);

    const handleInputChange = (event: { target: any; }) => {
        const target = event.target;
        const name = target.id;
        const value =  target.value;
        setInfoForm((prevState: any) => ({...prevState, [name]: value}));
      };


      function toggleForm(){
        setFormIsActive(!formIsActive);
    }

    function removeStation(id : string | number){
        const removeStationItems = [...localData].filter(item => item.id !== id)
        setLocalData(removeStationItems);
        localStorage.setItem("stations",JSON.stringify(removeStationItems));
        navigate("/WeatherStations");
    }

    function handleSubmit (e: { preventDefault: () => void; }) {
        e.preventDefault();
        localData.push({
          id:Math.floor(Math.random() * 99999),
          city:infoForm.city,
          latitude:infoForm.latitude,
          longitude:infoForm.longitude,
          altitude:infoForm.altitude
        })
        localStorage.setItem("stations",JSON.stringify(localData));
        toggleForm();
        navigate("/WeatherStations");
      }
      return(
        <div className="weather-stations-container">
            <form onSubmit={handleSubmit} className={formIsActive ? "invisible" : undefined}>
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
                    required
                    size="small"
                />
                <TextField
                    helperText="(between -180 and 180)"
                    id="longitude"
                    label="Longitude"
                    onChange={handleInputChange}
                    type="number"
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
    
                <table className="station-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Altitude</th>
                        </tr>
                    </thead>
                    <tbody>
                         {localData.map( (data: { city: string; latitude: string | number; longitude: string | number; altitude: string | number; id: string | number},key:string|number) => (
                            <tr key={key}>
                                <td>{data.city}</td>
                                <td>{data.latitude}</td>
                                <td>{data.longitude}</td>
                                <td>{data.altitude}</td>
                                <td><DeleteOutlinedIcon onClick={()=> removeStation(data.id)}/></td>
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

export default WeatherStations;