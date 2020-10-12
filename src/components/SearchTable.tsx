import React, { useState } from 'react'
import Resturant from '../definitions/Resturant'

const SearchTable = (props: any) => {
    const { resturants, setSearchResults } = props

    const [ searchTerm, setSearchTerm ] = useState('')

    const onSearchHandler = (e: any) => {
        e.preventDefault()

        // map through all resturants
        // if the search term appears as a name, city, or genre, add the resturant to searchResults
        // search results should not be case sensetive, DeNvEr should return Denver resturants
        let searchResults: any = []
        resturants.map((resturant: Resturant) => {
            const term = searchTerm.toLowerCase()
            const resturantName = resturant.name.toLowerCase()
            const resturantCity = resturant.city.toLowerCase()
            const resturantGenres = resturant.genre.split(',').map((genre: string) => genre.toLowerCase())
            if(resturantName.includes(term) || resturantCity.includes(term) || resturantGenres.includes(term)) {
                searchResults.push(resturant)
            }
        })

        // if no search results are found, just alert the user
        if(!searchResults.length) {
            alert(`No results found for ${ searchTerm }`)
        }

        setSearchResults(searchResults)
    }

    return (
        <form onSubmit={ e => onSearchHandler(e) } >
            <input value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } type="text" />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchTable
