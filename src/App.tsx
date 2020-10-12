import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Resturant from './definitions/Resturant'
import ResturantTable from './components/ResturantTable'

import './App.css'

const App = () => {

  const [ resturantData, setResturantData ] = useState()

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

  return (
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
        <ResturantTable resturants={ resturantData } />
      </tbody>
    </table>
  )
}

export default App
