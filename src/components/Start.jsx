import React from 'react';

function Start(props) {
    return (
        <div className={'start-container'}>
            <button className={'start-button'} onClick={props.handleClick()}>Start</button>
        </div>
    )
}

export default Start;