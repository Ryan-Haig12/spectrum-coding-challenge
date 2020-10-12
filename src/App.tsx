import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Resturant from './definitions/Resturant'

import GenreFilterDropdown from './components/GenreFilterDropdown'
import ResturantTable from './components/ResturantTable'
import StateFilterDropdown from './components/StateFilterDropdown'

import './App.css'

const App = () => {

  const [ resturantData, setResturantData ] = useState()
  const [ selectedGenre, setSelectedGenre ] = useState('all')
  const [ selectedState, setSelectedState ] = useState('all')

  const getApiData = async () => {
    const resData = await axios.get('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt'
      }
    })

    // sorts the resturant data alphabetically
    const sortedResturantData = resData.data.sort((a: Resturant, b: Resturant) => a.name.localeCompare(b.name))
    setResturantData(sortedResturantData)
  }
  
  // when the application loads, fire the async getApiData function to get all resturant data
  useEffect(() => {
    getApiData()
  }, [])

  if(!resturantData) {
    return (
      <div>Loading Resturant data...</div>
    )
  }

  if(selectedState !== 'all' && !resturantData.filter((resturant: Resturant) => selectedState === resturant.state).length) {
    return (
      <div>
        <StateFilterDropdown setSelectedState={ setSelectedState } />
        <GenreFilterDropdown setSelectedGenre={ setSelectedGenre } resturants={ resturantData } selectedState={ selectedState } />
        <h1>No Resturants found for state '{ selectedState }' and genre '{ selectedGenre }'</h1>
      </div>
    )
  }

  return (
    <div>
      <StateFilterDropdown setSelectedState={ setSelectedState } />
      <GenreFilterDropdown setSelectedGenre={ setSelectedGenre } resturants={ resturantData } selectedState={ selectedState } />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <ResturantTable resturants={ resturantData } selectedState={ selectedState } selectedGenre={ selectedGenre } />
        </tbody>
      </table>
    </div>
  )
}

export default App
