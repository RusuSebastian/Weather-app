import React,{useState} from "react"
import { Button } from "@mui/material"
import {Link} from 'react-router-dom'
import  styled  from "styled-components"

const initialState = {
    weather:true,
    stations:false
}

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledButton = styled(Button)`
width:180px;
`


const Navbar = () =>{

    const [check,setCheck]=useState(initialState);

    const btnClicked = (e: { target: { innerText: string } }) =>{
        if(e.target.innerText==="WEATHER"){
            setCheck({
                weather:true,
                stations:false
            });
            
        }else if(e.target.innerText==="MY WEATHER STATIONS"){
            setCheck({
                weather:false,
                stations:true
            });
        }
       
    }


    return(
        <nav>
            <StyledLink to="/" >
                <StyledButton size="small" variant={check.weather ? "contained" : "outlined"}  onClick={btnClicked}>Weather</StyledButton>
            </StyledLink>

            <StyledLink to="/weatherStations">
                <StyledButton size="small" variant={check.stations ? "contained" : "outlined"}  onClick={btnClicked}>My weather Stations</StyledButton>  
            </StyledLink>

        </nav>
    )
}

export default Navbar