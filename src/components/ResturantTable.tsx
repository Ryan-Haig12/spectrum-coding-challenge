import React from 'react'

import Resturant from '../definitions/Resturant'

const ResturantTable = (props: any) => {
  const { resturants, selectedState, selectedGenre, searchResults, pagination, setCurrentResturant } = props

  // if there is searchResults, render the table by those search results
  // if there are no serachResults, render the table by the original resturants list
  let filterBy = searchResults.length ? searchResults : resturants

  // slice list to create pagination effect
  filterBy = filterBy.slice((pagination - 1) * 10, pagination * 10)

  // genre is not playing nice with pagination at all...
  // pagination seems to work well when there's a selected state or a search result
  // but when genre !== all and there's 10+ genres (i.e. American), pagination just prints all results...
  return filterBy.map((resturant: Resturant) => {
      // show all states if selectedState is set to all
      // else, only show the data for the state selected by the user
      if((selectedState === 'all' || selectedState === resturant.state) && (selectedGenre === 'all' || resturant.genre.split(',').includes(selectedGenre))) {
        return (
          <tr key={ resturant.id } onClick={ () => setCurrentResturant(resturant) } >
            <td>{ resturant.name }</td>
            <td>{ resturant.city }</td>
            <td>{ resturant.state }</td>
            <td>{ resturant.telephone }</td>
            <td>{ resturant.genre }</td>
          </tr>
        )
      }
      return null // gets rid of console error
  })
}

export default ResturantTable
