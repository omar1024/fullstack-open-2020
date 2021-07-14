import React, { useEffect, useState } from "react";
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import SearchResults from './components/Filter'
import Filter from './components/SearchInput'
import axios from "axios"



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filerPerson, setFilterPerson] = useState(persons)

useEffect(()=>{
  axios.get("http://localhost:3001/persons")
  .then(response => {
    setPersons(response.data);
  })
},[])

  const personsList =filerPerson.map(person => {
    return <Person key={person.id} name={person.name}  phoneNumber={person.number}/>;

  }); 

  const handleChange = event => {
    setNewName(event.target.value);
  };
  const handleChanger = event => {
    setNewNumber(event.target.value);
  };
  const searchFilter = event => {
    setSearch(event.target.value);
    setFilterPerson(persons.filter((person) =>
    (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
  };
  const handleSubmit = event => {
    event.preventDefault();

    const person = {
      name: newName,
      number : newNumber,
      id : persons.length+1
    };

    setPersons([...persons].concat(person));
    setNewName("");
    setNewNumber("");
  };

  const data = {
    newName,
    newNumber,
    handleChange,
    handleChanger
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChange = {searchFilter} value = {search} />
        <br/>
        <h2>add new</h2>
        <br/>
      <PersonForm addPerson = {handleSubmit} data = {data} />
      <h2>Numbers</h2>
      <SearchResults list = {personsList}/>
    </div>
  );
};

export default App;