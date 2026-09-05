import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({personsToShow, handleDelete }) => {
  return (
    <ul>
        {personsToShow.map(person => 
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(p => p.name === newName)
    if (nameExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...nameExists, number: newNumber }

        personService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === nameExists.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    const personObject = { name: newName, number: newNumber }
    
    personService
      .create(personObject)
      .then(returnedPerson => {  
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

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
      <Persons 
        personsToShow = {personsToShow} 
        handleDelete={handleDeleteOf} 
      />
    </div>
  )

}

export default App