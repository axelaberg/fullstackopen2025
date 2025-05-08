import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    console.log('Before', persons)
    const nameExists = persons.some(person => person.name == newName)
    if (!nameExists) {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    } else {alert(`${newName} is already added to phonebook`)}
    }
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <li key={person.name}>
          {person.name}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App