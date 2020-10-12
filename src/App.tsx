import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

interface Resturant {
  id: string,
  address1: string,
  attire: string,
  city: string,
  genre: string,
  hours: string,
  lat: string,
  long: string,
  name: string,
  state: string,
  tags: string,
  telephone: string,
  website: string,
  zip: string
}

const App = () => {

  const [ resturantData, setResturantData ] = useState()

  const getApiData = async () => {
    const resData = await axios.get('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt'
      }
    })
    setResturantData(resData.data)
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

  console.log(resturantData)

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
        { resturantData.map((resturant: Resturant) => {
          console.log(resturant)
          return (
            <tr key={ resturant.id } >
              <td>{ resturant.name }</td>
              <td>{ resturant.city }</td>
              <td>{ resturant.state }</td>
              <td>{ resturant.telephone }</td>
              <td>{ resturant.genre }</td>
            </tr>
          )
        }) }
        <tr>
          <td>January</td>
          <td>$100</td>
        </tr>
      </tbody>
    </table>
  )
}

export default App
