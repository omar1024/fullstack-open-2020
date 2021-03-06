import axios from "axios";
import React, {useEffect, useState} from "react";
import CountryList from './components/CountryList';
import SingleCountry from "./components/SingleCountryInfo";


const App = () => {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [filterCountry,setFilterCountry] = useState([]);
  const searchInputHandler = event  =>{
    setCountry(event.target.value);
    setFilterCountry(countryList.filter((element)=> (element.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
  }

  useEffect(()=>{
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log(response.data);
        setCountryList(response.data);
      })
  },[])

  const CountryRender = () => {

    if(filterCountry.length > 10){
      return <p>Too many matches specify another country</p>
    }else if(filterCountry.length === 1){
      return (
        <div>
          <SingleCountry name={filterCountry[0].name} languages = {filterCountry[0].languages} capital = {filterCountry[0].capital} population = {filterCountry[0].population} flag = {filterCountry[0].flag} />
        </div>
      )}
    else{
      return <CountryList data = {filterCountry}/>
    }
  }
  return (
    <>
      <div>
        find countries <input onChange = {searchInputHandler} value = {country}></input>
      </div> 
      <CountryRender />
    </>
  );
};

export default App;