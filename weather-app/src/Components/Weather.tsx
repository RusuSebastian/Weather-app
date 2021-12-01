import React, {useState} from "react"
import { dateBuilder } from "../Utility/DateBuilder";
import Filter from "./FilterInput";
import CurrentWeather from "./CurrentWeather";
import { Button } from "@mui/material";
import JSONDATA from "../Data/city.list.json";
import Thead from "./Thead";
import MyComponent from "./Map";

const api = {
    key:"9eac77f23f3ff4c73ff67c72c5396561",
    base: "https://api.openweathermap.org/data/2.5/"
};

const switchButtonVariant = {
    currentWeather: true,
    fiveDayForecast: false
};

const Weather = () => {
    const [weather,setWeather] = useState<any>({});
    const [weatherFiveDays, setWeatherFiveDays] = useState <Array<string|number|null|undefined>>([]);
    const [value, setValue] = useState<string | null>();
    const [inputValue, setInputValue] = React.useState('');
    const [btnVariant, setBtnVariant]=useState(switchButtonVariant);

    const currentCity = JSONDATA.filter( (city: { name: string; }) => city.name===value );

    const btnClick = (page: string) => {
        if(page === "current" && value !== null){
            setBtnVariant({
                currentWeather:true,
                fiveDayForecast:false
            });
            fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                })
                .catch((error)=>alert(error));

        }else if (page === "fiveday" && value !== null && inputValue !== ""){
            setBtnVariant({
                currentWeather:false,
                fiveDayForecast:true
            });
            
            fetch(`${api.base}onecall?lat=${currentCity[0].coord.lat}&lon=${currentCity[0].coord.lon}&exclude=current,hourly,alerts,minutely&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(resu => {
                    setWeatherFiveDays(resu.daily);
                })
                .catch((error)=>alert(error));
        }
    }
    return (
        <>
        <div className="buttons-container">
            <div className="filter-container">
               <Filter 
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue} 
                onInputChange={(event: any, newInputValue: any) => {
                    setInputValue(newInputValue);
                } }       
                ></Filter> 
            </div>
            <div className="btns-container">
                <Button
                    size="small" 
                    variant={btnVariant.currentWeather ? "contained" : "outlined"}  
                    onClick={() => btnClick("current")}
                >Current Weather</Button>
                <Button
                    size="small" 
                    variant={btnVariant.fiveDayForecast ? "contained" : "outlined"}  
                    onClick={() => btnClick("fiveday")}
                >5 day forecast</Button>  
            </div> 
        </div>

        {(typeof weather.main != "undefined" || typeof weatherFiveDays[0] != "undefined" ) ? (
            <>
            <h3>Current weather for {inputValue}</h3>
            <section>
                <table>
                    <Thead/>
                    <tbody>
                        {(btnVariant.currentWeather)?(
                           <tr>
                                <CurrentWeather 
                                    max={Math.round(weather.main.temp_max)} 
                                    min={Math.round(weather.main.temp_min)} 
                                    date={dateBuilder(new Date())} 
                                    weatherType={weather.weather[0].description} 
                                    weatherIcon={weather.weather[0].icon}
                                /> 
                            </tr> 
                        ):(
                            weatherFiveDays.slice(0,5).map((item: any,key:any)=>(
                                <tr key={key}>
                                    <CurrentWeather 
                                        max={Math.round(item.temp.max)} 
                                        min={Math.round(item.temp.min)} 
                                        date={dateBuilder(new Date(item.dt*1000))} 
                                        weatherType={item.weather[0].description} 
                                        weatherIcon={item.weather[0].icon}
                                     /> 
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="map-container">
                    {(weather.coord !== undefined) ?(
                        <MyComponent centers={{ lat: weather.coord.lat, lng: weather.coord.lon }} />
                    ):(
                        <MyComponent centers={{ lat: currentCity[0].coord.lat, lng: currentCity[0].coord.lon }} />
                    )}
                </div>
                
            </section>
            </>
        ):(
            <p className="placeholder">Search for a city above to see the current  weather information</p>
        )}
        </>
    )
}

export default Weather