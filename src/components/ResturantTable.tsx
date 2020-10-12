import React from 'react'

import Resturant from '../definitions/Resturant'

const ResturantTable = (props: any) => {
  const { resturants, selectedState, selectedGenre, searchResults } = props

  console.log('from table', selectedState, selectedGenre, searchResults)

  // if there is searchResults, render the table by those search results
  // if there are no serachResults, render the table by the original resturants list
  let filterBy = searchResults.length ? searchResults : resturants

  return filterBy.map((resturant: Resturant) => {
      // show all states if selectedState is set to all
      // else, only show the data for the state selected by the user
      if((selectedState === 'all' || selectedState === resturant.state) && (selectedGenre === 'all' || resturant.genre.split(',').includes(selectedGenre))) {
        return (
          <tr key={ resturant.id } >
            <td>{ resturant.name }</td>
            <td>{ resturant.city }</td>
            <td>{ resturant.state }</td>
            <td>{ resturant.telephone }</td>
            <td>{ resturant.genre }</td>
          </tr>
        )
      }
  })
}

export default ResturantTable
