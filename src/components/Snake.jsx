import React from 'react';

function Snake(props) {
    return (
        props.snakePos.map((loc, i) => {
            return (<div className='snake' style={{top: `${loc.y}%`, left:`${loc.x}%`}}></div>)
        })
    )
}

export default Snake;