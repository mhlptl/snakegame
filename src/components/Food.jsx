import React from 'react';

function Food(props) {
    return (
        <div className='food' style={{top: `${props.foodPos[1]}%`, left: `${props.foodPos[0]}%`}}></div>
    )
}

export default Food;