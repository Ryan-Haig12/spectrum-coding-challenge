import React from 'react'

import Resturant from '../definitions/Resturant'

const ResturantTable = (props: any) => {
    const { resturants } = props

    return resturants.map((resturant: Resturant) => {
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
    })
}

export default ResturantTable
