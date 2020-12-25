import React from 'react';

function Snake(props) {
    return (
        props.snakePos.map((loc, i) => {
            let x = loc.x;
            let y = loc.y;
            // console.log(loc);
            return (<div key={i} className='snake' style={{left:`${x}%`, top: `${y}%`}}></div>)
        })
    )
}

export default Snake;