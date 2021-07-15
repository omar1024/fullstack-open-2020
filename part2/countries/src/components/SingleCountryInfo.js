import React from 'react';


const SingleCountry = ({ name, capital, population, languages,flag}) =>{
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
            alt = ""
          />

        </div>
    );
}

export default SingleCountry;