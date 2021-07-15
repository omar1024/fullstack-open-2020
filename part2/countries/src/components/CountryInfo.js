import React, { useState} from 'react';
import SingleCountry from './SingleCountryInfo'

const CountryInfo = ({id , country}) => {
    const [show, setShow] = useState(false)
    const showCountry = ()=>{
        setShow(show ? false : true)
    }

    const RenderCountry = ({country}) =>{
        if(show === true){
            return <SingleCountry name={country.name} languages = {country.languages} capital = {country.capital} population = {country.population} flag = {country.flag} />
        }else{
            return <p></p>
        }
    }
    return(
        <div id = {id}>
            {country.name} <button type="button" onClick = {showCountry}> show</button>
            <RenderCountry country = {country}/>
        </div>
    )
}
export default CountryInfo