import React, { Component } from 'react';

const GifCard = props => {
    return (
        <div>
            <img src={props.url}/>
        </div>
    )
}

export default GifCard;