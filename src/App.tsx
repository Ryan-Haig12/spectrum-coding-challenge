import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Resturant from './definitions/Resturant'

import GenreFilterDropdown from './components/GenreFilterDropdown'
import ResturantTable from './components/ResturantTable'
import SearchTable from './components/SearchTable'
import StateFilterDropdown from './components/StateFilterDropdown'

import './App.css'
import ResturantDetails from './components/ResturantDetails'

const App = () => {

  const [ currentResturant, setCurrentResturant ] = useState({})
  const [ resturantData, setResturantData ] = useState()
  const [ searchResults, setSearchResults ] = useState([])
  const [ selectedGenre, setSelectedGenre ] = useState('all')
  const [ selectedPagination, setSelectedPagination ] = useState(1)
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

  // ensure when the user presses Back or Next, the previous or next 10 listings are shown
  // this took me a while, and it's ugly..... but it works!
  // If I had more time to write this application, I'd make this table show data from a GraphQL endpoint
  // this would make pagination, genre selection, search results, etc. SO much easier to grab/show
  const handlePagination = (pag: number) => {
    let i = selectedPagination
    // do not allow pagination to go under 1 or above the max resturantData.length / 10
    if((pag === 1 && !(selectedPagination + 1 > (resturantData.length / 10) + 1)) || (pag === -1 && selectedPagination !== 1)) setSelectedPagination(i += pag)
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

  // if there are no results for the given state/genre, return a message saying so
  // also give the user the ability to change states and genres
  if(selectedState !== 'all' && !resturantData.filter((resturant: Resturant) => selectedState === resturant.state).length) {
    return (
      <div>
        <StateFilterDropdown setSelectedState={ setSelectedState } />
        <GenreFilterDropdown setSelectedGenre={ setSelectedGenre } resturants={ resturantData } selectedState={ selectedState } />
        <h1>No Resturants found for state '{ selectedState }' and genre '{ selectedGenre }'</h1>
        <button
          onClick={ () => { setSearchResults([]); setSelectedGenre('all'); setSelectedPagination(1); setSelectedState('all') } }
        >Reset Search</button>
      </div>
    )
  }

  return (
    <div>
      <StateFilterDropdown setSelectedState={ setSelectedState } />
      <GenreFilterDropdown setSelectedGenre={ setSelectedGenre } resturants={ resturantData } selectedState={ selectedState } />
      <SearchTable setSearchResults={ setSearchResults } resturants={ resturantData } />

      <table id="resturantTable">
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
          <ResturantTable 
            resturants={ resturantData }
            selectedState={ selectedState }
            selectedGenre={ selectedGenre }
            searchResults={ searchResults }
            pagination={ selectedPagination }
            setCurrentResturant={ setCurrentResturant }  
          />
        </tbody>
      </table>
      <div id="buttonContainer">
        <button style={{ float: 'left' }} onClick={ () => handlePagination(-1) }>Back</button>
        <button style={{ float: 'right' }} onClick={ () => handlePagination(1) }>Next</button>
      </div>
      
      <ResturantDetails currentResturant={ currentResturant } />
    </div>
  )
}

export default App
