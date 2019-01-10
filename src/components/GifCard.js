import React, { Component } from 'react';
import './GifCard.css';

const GifCard = props => {
    return (
        <div>
            <img class="gifCard" src={props.url}/>
        </div>
    )
}

export default GifCard;