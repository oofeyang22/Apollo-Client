import { useState } from 'react'
import React from 'react'
//import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
// CountryInfo from './components/CountryInfo'

import { useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      currency

    }
  }
`;

// create a component that renders a select input for coutries
function CountryInfo() {
  const [country, setCountry] = useState('US');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }


  // Find the selected country object
  const selectedCountry = data.countries.find((c) => c.code === country);
  return (
    <div>

      <select value={country} onChange={event => setCountry(event.target.value)}>
        {data.countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div>
          <p>Capital: {selectedCountry.capital}</p>
     
          <p>Currency: {selectedCountry.currency}</p>
        
        </div>
      )}
    </div>


  );
}

function App() {
  //const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}>
      <CountryInfo />
    </ApolloProvider>

  )
}

export default App
