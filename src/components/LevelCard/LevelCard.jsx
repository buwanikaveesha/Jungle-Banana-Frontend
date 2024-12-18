import React from 'react';
import './LevelCard.css';

function LevelCard({ time, title, btnLevel, image, onStart }) {

    return (
        
        <div className="level-card">
            <p>{time}</p>
            <h2>{title}</h2>
            <div className='card-image-button'>
            {image && <img src={image} alt="Level Icon" className="level-icon" />}
            <button className='level-btn3' onClick={onStart}>{btnLevel}</button>
            </div>
        </div>
       

    )
}

export default LevelCard;