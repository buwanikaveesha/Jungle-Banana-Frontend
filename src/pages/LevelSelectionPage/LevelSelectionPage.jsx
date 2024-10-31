import React from 'react';
import SlideMenuBar from '../../components/NavBar/NavBar';
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
        <div>
        <SlideMenuBar /> {/* Add SlideMenuBar here */}
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
            </div>
        </>
    );
};

export default LevelSelectionPage;
