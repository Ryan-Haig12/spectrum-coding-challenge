import React from 'react'

import statesHash from '../utils/statesHash'

const StateFilterDropdown = (props: any) => {

    const { setSelectedState } = props

    const changeStateHandler = (e: any) => {
        setSelectedState(e.target.value)
    }

    return (
        <select onChange={ e => changeStateHandler(e) } >
            <option value="all" >All States</option>
            { statesHash.map(state => <option value={ state } >{state}</option>) }
        </select>
    )
}

export default StateFilterDropdown
