import React from 'react';
import CountryInfo from './CountryInfo'


const CountryList = ({ data }) =>{
    const countryList = data.map((country,i) => {
        return (<CountryInfo id = {i+1} country={country}/>)
    });
    return(
        <div>
            {countryList}
        </div>
    );
}

export default CountryList