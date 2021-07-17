import React, { useEffect, useState } from "react";
import phoneNumberService from './components/services/PhoneNumber'
import InputForm from './components/InputForm'
import SearchFilter from './components/SearchFilter'
import ContactList from "./components/ContactList"

const App = () => {
  const [contacts, setContacts] = useState([])
   const [newName, setNewName] = useState('')
   const [newNumber, setNewNumber] = useState('')
   const [newFilter, setNewFilter] = useState('')
 
   const handleFilterChange = (event) => { setNewFilter(event.target.value) }
   const handleNameChange = (event) => { setNewName(event.target.value) }
   const handleNumberChange = (event) => { setNewNumber(event.target.value) }
 
  const getContacts = () =>{phoneNumberService.getAll().then(response => setContacts(response.data))}

  useEffect(getContacts,[])

  const addContact = (event)=>{
    event.preventDefault()
    const newContact = {name : newName, number : newNumber}
    phoneNumberService.create(newContact).then(response => {
      setContacts(contacts.concat(response.data))
    })
    setNewName("")
    setNewNumber("")
  }
  const deleteContact = (event)=>{
    const singleContact = event.target
    const confirm = window.confirm(`Are you sure you want to delete ${singleContact.name} ?`)
    const sameName = contacts.filter(contact => contact.name === newName)
    if (sameName.length > 0) {
      const msg = `Contact ${newName} is already in the phonebook. Do you want to replace the old contact?`
      const confirm = window.confirm(msg)
      if (confirm) {
        phoneNumberService.update(sameName[0].id, singleContact).then(getContacts)
      }
    } else if(confirm !== true){
      phoneNumberService.create(singleContact).then(
        response => {setContacts(contacts.concat(response.data))}
      )
    }
}
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value = {newFilter}  onChange={handleFilterChange} />
      <h2>Add new</h2>
      <InputForm
        addObject={addContact} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </InputForm>
      <h2>Numbers</h2>
      <ContactList contacts = {contacts} filter = {newFilter} deleteFun = {deleteContact} />

      </div>
  );
};

export default App;