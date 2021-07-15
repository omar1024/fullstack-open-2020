// @ts-nocheck
import React,{useState,useEffect} from 'react';
import axios from "axios"


const api_key = process.env.REACT_APP_WEATHER


const SingleCountry = ({ name, capital, population, languages,flag}) =>{
  const [weather, setWeather] = useState({})
  useEffect(()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response =>{
        console.log(response.data);
        console.log(api_key)
        setWeather(response.data.current)
      })
  },[capital])   
   return (
        <div>
            <h1>
                <p>{name}</p>
            </h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>Languages</h2>
          <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img
            src = {flag}
            alt = "Flag missing"
          />
          <h2>Weather in {capital}</h2>
          <p><span><strong>Temperature:</strong> {weather.temperature} Celsius</span></p>
          <p><span><strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</span></p>
        </div>
    );
}

export default SingleCountry;