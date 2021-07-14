import React, { useEffect, useState } from "react";
import Person from './components/Person'
import axios from "axios"



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

useEffect(()=>{
  axios.get("http://localhost:3001/persons")
  .then(response => {
    setPersons(response.data);
  })
},[])

  const personsList = persons.map(person => {
    return <Person key={person.id} name={person.name}  phoneNumber={person.number}/>;
  });

  const handleChange = event => {
    setNewName(event.target.value);
  };
  const handleChanger = event => {
    setNewNumber(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          name:{" "}
          <input onChange={event => handleChange(event)} value={newName} />
        </div>
        <div>
          phoneNumber:{" "}
          <input onChange={event => handleChanger(event)} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsList}
    </div>
  );
};

export default App;