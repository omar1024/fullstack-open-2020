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
   const [notification, setNotification] = useState(null)

 
   const handleFilterChange = (event) => { setNewFilter(event.target.value) }
   const handleNameChange = (event) => { setNewName(event.target.value) }
   const handleNumberChange = (event) => { setNewNumber(event.target.value) }
 
  const getContacts = () =>{phoneNumberService.getAll().then(response => setContacts(response.data))}

  useEffect(getContacts,[])

  const messageDisplayTime = 3000 // ms
  const standardError = {type: 'errorNotification', message: 'Operation failed. Refresh your browser.'}
  const deleteNotificationFunction = (name) => {
    setNotification({type: 'deleteNotification', message: `Deleted ${name} from contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const updateNotificationFunction = (name) => {
    setNotification({type: 'updateNotification', message: `Updated ${name} in contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const addNotificationFunction = (name) => {
    setNotification({type: 'addNotification', message: `Added ${name} to contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const errorNotificationFunction = () => {
    setNotification(standardError)
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const addContact = (event)=>{
    event.preventDefault()
    const contactObject = { name: newName, number: newNumber }
    const sameName = contacts.filter(contact => contact.name === newName)
    if (sameName.length > 0) {
      const msg = `Contact ${newName} is already in the phonebook. Do you want to replace the old contact?`
      const confirm = window.confirm(msg)
      if (confirm) {
        phoneNumberService.update(sameName[0].id, contactObject).then(getContacts)
        .then(() => {updateNotificationFunction(newName)}).catch(error => {errorNotificationFunction()})
      }
    } else {
      phoneNumberService.create(contactObject).then(
        response => {setContacts(contacts.concat(response.data))}
      ).then(() => {addNotificationFunction(newName)})
      .catch(error => {errorNotificationFunction()})
    }
  }
  const deleteContact = (event) => {
    const button = event.target
    const confirm = window.confirm(`Delete ${button.name}?`);
    if (confirm) {
      phoneNumberService.destroy(button.id).then(getContacts)
      .then(() => {deleteNotificationFunction(button.name)})
      .catch(error => {errorNotificationFunction()})
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