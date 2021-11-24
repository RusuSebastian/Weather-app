import React, {useState} from "react";
import SimpleMap from "./Components/map";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import "./Styles/index.css"
import CurrentWeather from "./Components/CurrentWeather";
import JSONDATA from "./Data/city.list.json"

const api = {
  key:"9eac77f23f3ff4c73ff67c72c5396561",
  base: "https://api.openweathermap.org/data/2.5/"
};

let initialState = {
  current: true,
  five: false
};

function Weather() {
  const [query,setQuery] = useState<any>("");
  const [weather,setWeather] = useState<any>({});
  const [list,setList]= useState<any>([]);
  const [state,setState] = useState<any>();
  const [coord,setCoord]=useState<any>({});

  const search = (e: { key: string; }) =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setList([]);
        });
      initialState.current = true;
      initialState.five = false;
    }
    
  } 

 const dateBuilder = (d: Date) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day=days[d.getDay()].substring(0,3);
    let date=d.getDate();
    let month = months[d.getMonth()].substring(0,3);
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
  }

  
  const btnClicked = (e: { target: { innerText: string; }; }) =>{
    coordsFromJson () 
    if(Object.keys(coord).length!==0 && e.target.innerText==="5 DAY FORECAST"){
        fetch(`${api.base}onecall?lat=${(Object.keys(coord).length!==0) ? weather.coord.lat:coord.coord.lat }&lon=${(Object.keys(coord).length!==0) ? weather.coord.lon:coord.coord.lon }&exclude=current,hourly,alerts,minutely&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data =>{
          setList(data.daily.slice(1,5));
        })
        initialState.five = true;
        initialState.current = false;
        
    }else if(e.target.innerText==="CURRENT WEATHER"){
      setList([]);
      initialState.current = true;
      initialState.five = false;
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setList([]);
        });
    }
  }

  if(document.querySelector(".sugestions") != null)
  {
    document.querySelector(".sugestions").addEventListener("click",(e)=>{
      setQuery(e.target.innerText);
      document.getElementById("outlined-basic").value=e.target.innerText;
      setState(false);
      coordsFromJson ();
    });
  }

  function coordsFromJson () {
    const datas=JSONDATA.filter((val: { name: string; coord: any; })=>{
        if(val.name.toLowerCase().includes(query.toLowerCase())){
         return val.coord
        }
      });  
      setCoord(datas[0])
        
  }
  

  return (
    
      <div className="app">
        <main>
          <div className="filter-container">
            <div className="search-box">
              <TextField 
              size="small"
              id="outlined-basic" 
              placeholder="search for city" 
              label="City" variant="outlined" 
              onChange={e =>{setQuery(e.target.value); setState("true") }}
              defaultValue={query}
              onKeyPress={search}
              />

              <div className="sugestions">
                {
                  JSONDATA.filter((val: { name: string; })=>{
                      if( query === ""){
                        return val
                      } else if (val.name.toLowerCase().includes(query.toLocaleLowerCase())){
                        return val
                      }
                  }).slice(0,15).map((val: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; },key: React.Key | null | undefined)=>{
                    if(query !== "" && state ==="true")  return <div className="list-item" key={key}>{val.name}</div>;
                  })
                }
              </div>
            </div>

            <div className="btn-container">
              <Button size="small" variant={initialState.current ? "contained" : "outlined"} className="current-weather active" onClick={btnClicked}>Current weather</Button>
              <Button size="small" variant={initialState.five ? "contained" : "outlined"} className="five-day" onClick={btnClicked}>5 day forecast</Button>  
            </div>
            
          </div>

          {( typeof weather.main !="undefined") ? (
          <div className="info-container">

            <h4 className="location">Current weather for {weather.name}, {weather.sys.country}</h4>

            <section>
              
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>High</th>
                    <th>Low</th>
                  </tr>
                </thead>
                <tbody>
                  <tr> 
                    <CurrentWeather 
                      max={Math.round(weather.main.temp_max)} 
                      min={Math.round(weather.main.temp_min)} 
                      date={dateBuilder(new Date())} 
                      weatherType={weather.weather[0].description} 
                      weatherIcon={weather.weather[0].icon}
                    />
                  </tr>
                {
                !!list && list.map((item: { temp: { max: number; min: number; }; weather: { icon: any; description:any }[]; },index: React.Key | null | undefined)=>(
                  <tr key={index}>
                    <CurrentWeather 
                      max={Math.round(item.temp.max)} 
                      min={Math.round(item.temp.min)} 
                      date={dateBuilder(new Date())} 
                      weatherType={item.weather[0].description} 
                      weatherIcon={item.weather[0].icon}
                    />
                  </tr>
                  ))
                  }

                </tbody>
              </table>
              <div className="map-container">
                <SimpleMap center={{lat:weather.coord.lat,lng:weather.coord.lon}}/>
              </div>
              
            </section>

          </div>
          ) : (
              <p className="placeholder">Search for a city above to see the current  weather information</p>
          )}


        </main>
      </div>
    
  );
}

export default Weather;
