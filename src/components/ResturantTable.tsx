import React from 'react'

import Resturant from '../definitions/Resturant'

const ResturantTable = (props: any) => {
  const { resturants, selectedState, selectedGenre } = props

  console.log('from table', selectedState, selectedGenre)

  return resturants.map((resturant: Resturant) => {
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
