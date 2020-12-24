import React from 'react';
import '../App.css';

function Result(props) {
    return (
        <div className='result'>
            <h1>{props.result}</h1>
            <button onClick={props.handleClick()}>Play again</button>
        </div>
    );
}

export default Result;