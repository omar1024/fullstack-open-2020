import React from 'react';

const CountryInfo = ({id , name}) => {
    return(
        <div id = {id}>
            <p>{name}</p>
        </div>
    )
}
export default CountryInfo