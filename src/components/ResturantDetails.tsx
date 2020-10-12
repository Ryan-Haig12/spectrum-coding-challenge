import React from 'react'

const ResturantDetails = (props: any) => {
    const { currentResturant } = props
    const { name, address1, city, state, zip, hours, telephone, website } = currentResturant

    if(currentResturant?.name) {
        return (
            <div id="currentResturant" >
                <h1 style={{ borderBottom: '1px solid black', background: '#030146', color: 'white' }} >{ name }</h1>
                <p>{ address1 }, { city }, { state }, { zip }</p>
                <p>{ hours }</p>
                <p>{ telephone }</p>
                <p>{ website }</p>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default ResturantDetails
