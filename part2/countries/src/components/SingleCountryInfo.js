import React from 'react';


const SingleCountry = ({ name, capital, population}) =>{
    return (
        <div>
            <h1>
                <p>{name}</p>
            </h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
        </div>
    );
}

export default SingleCountry;