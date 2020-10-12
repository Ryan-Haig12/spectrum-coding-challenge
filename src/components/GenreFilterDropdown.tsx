import React from 'react'
import Resturant from '../definitions/Resturant'

const GenreFilterDropdown = (props: any) => {

    const { setSelectedGenre, resturants, selectedState } = props

    const changeStateHandler = (e: any) => {
        setSelectedGenre(e.target.value)
    }

    // ensure that the only genres shown to the user are genres that are currently available
    // to the state that has been selected by the user
    let availableGenres: any = []
    resturants.map((resturant: Resturant) => {
        if(selectedState === 'all' || selectedState === resturant.state){
            // ensure the user does not see duplicate genres
            resturant.genre.split(',').map((genre: any) => !availableGenres.includes(genre) && availableGenres.push(genre))
        }
        return null // gets rid of console error
    })

    // sort genres in alphabetical order
    availableGenres.sort((a: any, b: any) => a.localeCompare(b))

    return (
        <select id="dropdown" style={{ float: 'right' }} onChange={ e => changeStateHandler(e) } >
            <option value="all" >All Genres</option>
            { availableGenres.map((genre: any) => <option key={ genre } value={ genre } >{genre}</option>) }
        </select>
    )
}

export default GenreFilterDropdown
