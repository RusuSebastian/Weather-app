import React from "react"


interface Props {
    max:any,
    min:any,
    weatherType:any,
    weatherIcon:any,
    date:any
}



const CurrentWeather: React.FC<Props> = ({max,min,weatherType,weatherIcon,date}) =>{
    return(
        <>
            <td>{date}</td>
            <td><img alt="weather img" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} /></td>
            <td>{weatherType}</td>
            <td>{max}°c </td>
            <td>{min}°c </td>
        </>
    )
}

export default CurrentWeather;