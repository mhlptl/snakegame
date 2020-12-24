import React from 'react';

function Snake(props) {
    return (
        props.snakePos.map((loc, i) => {
            return (<div key={i} className='snake' style={{left:`${loc.x}%`, top: `${loc.y}%`}}></div>)
        })
    )
}

export default Snake;