import React,{useState,useEffect} from 'react';
import axios from "axios"


const api_key = process.env.REACT_APP_WEATHER


const SingleCountry = ({ name, capital, population, languages,flag}) =>{
    console.log("hi")
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
          <p><span><strong>Temperature:</strong> </span></p>
          <p><span><strong>Wind:</strong> ""</span></p>
        </div>
    );
}

export default SingleCountry;