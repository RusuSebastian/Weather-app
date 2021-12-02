import React,{useState} from "react"
import { Button } from "@mui/material"
import LinkStyled from "../StyledComponents/StyledLink"

const initialState = {
    weather:true,
    stations:false
}

const Navbar = () => {
    const [check,setCheck] = useState(initialState);

    const btnClick = (page: string) => {
        if(page === "weather"){
            setCheck({
                weather:true,
                stations:false
            });
        }else if (page === "stations"){
            setCheck({
                weather:false,
                stations:true
            });
        }
    }
    return(
        <nav>
            <LinkStyled route = "/">
                <Button 
                    size="small" 
                    variant={check.weather ? "contained" : "outlined"}  
                    onClick={() => btnClick("weather")}
                > Weather </Button>
            </LinkStyled>
            <LinkStyled route = "/WeatherStations">
                <Button 
                    size="small" 
                    variant={check.stations ? "contained" : "outlined"} 
                    onClick={() => btnClick("stations")} 
                > My Weather Stations </Button>
            </LinkStyled>
        </nav>
    )
}

export default Navbar