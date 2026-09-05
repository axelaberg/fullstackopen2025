import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({onSubmit, name, onNameChange, number, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <ul>
        {personsToShow.map(person => 
        <li key={person.name}>
          {person.name} {person.number}
          </li>
        )}
      </ul>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(p => p.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={searchQuery} 
                onChange={event => setSearchQuery(event.target.value)}
          />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        onNameChange={event => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} />
    </div>
  )

}

export default App