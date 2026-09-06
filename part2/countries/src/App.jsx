import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0]

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital || 'N/A'}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img 
        src={country.flags.png} 
        alt={country.flags.alt || `Flag of ${country.name.common}`} 
        width="150" 
      />

      {capital && (
        <Weather capital={capital} />
      )}
    </div>
  )
}

const CountryList = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(c => (
          <div key={c.cca3 || c.name.common}>
            {c.name.common}{' '}
            <button onClick={() => onShowCountry(c.name.common)}>
              show 
            </button>
          </div>
        ))}
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return <div>No matches found</div>
}

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const filteredCountries = query.trim() === ''
    ? []
    : allCountries.filter(c => 
        c.name.common.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <div>
      <div>
        find countries <input value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      {query.trim() !== '' && (
        <CountryList 
          countries={filteredCountries} 
          onShowCountry={name => setQuery(name)}
        />
      )}
    </div>
  )
}

export default App