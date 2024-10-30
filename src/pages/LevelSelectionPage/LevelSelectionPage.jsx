import React from 'react';
import centeredImage from '../../assets/images/Group 7.png';
import LevelButton from './LevelButton';
import './LevelSelectionPage.css';

const LevelSelectionPage = () => {
    const levels = [
        { time: '15 Seconds', number: 1 },
        { time: '10 Seconds', number: 2 },
        { time: '8 Seconds', number: 3 }
    ];

    return (
        <>
            {/* Overlay image positioned in the center */}
            <div className="center-image-overlay">
                <img src={centeredImage} alt="Overlay" />
            </div>
            
            {/* Level selection interface */}
            <div className="level-page">
                <h1 className="title">Choose a Level</h1>
                <br></br>
                <div className="level-buttons">
                    {levels.map(level => (
                        <LevelButton key={level.number} time={level.time} number={level.number} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LevelSelectionPage;
