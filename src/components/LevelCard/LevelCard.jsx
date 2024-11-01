import React from 'react';
import './LevelCard.css';

function LevelCard({ time, title, btnLevel, onStart }) {

    return (
        <div className="level-card">
            <p>{time}</p>
            <p>{title}</p>
            <button className='level-btn3' onClick={onStart}>{btnLevel}</button>
            
        </div>

    )
}

export default LevelCard;