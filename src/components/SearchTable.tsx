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
            return null // gets rid of console error
        })

        // if no search results are found, just alert the user
        if(!searchResults.length) {
            alert(`No results found for ${ searchTerm }`)
        }

        setSearchResults(searchResults)
    }

    return (
        <form id="searchForm" onSubmit={ e => onSearchHandler(e) } >
            <input value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } type="text" placeholder="Search for Resturants!" />
            <button type="submit">Search</button>
            <button onClick={ () => setSearchTerm('') } >Clear Search</button>
        </form>
    )
}

export default SearchTable
