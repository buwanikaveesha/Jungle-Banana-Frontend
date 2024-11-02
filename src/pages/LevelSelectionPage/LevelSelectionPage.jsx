import React from 'react';
import { useNavigate } from 'react-router-dom';
import easyImage from '../../assets/images/easyMonkey.png';
import hardImage from '../../assets/images/hardMonkey.png';
import mediumImage from '../../assets/images/mediumMonkey.png';
import LevelCard from '../../components/LevelCard/LevelCard';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './LevelSelectionPage.css';

const LevelSelectionPage = () => {

    const navigate = useNavigate();
    
    const handleLevel = (level) => {
        navigate(`/level/${level}`);
    }

    return (
        <>
        <div>
        <SlideMenuBar /> {/* Add SlideMenuBar */}
            {/* Level selection interface */}
            
                <h1 className="title-levelselection">CHOOSE A LEVEL</h1>
                <br></br>
                <div className="level-page">
                <div className='level-card-container'>
                <LevelCard 
                    time = "15 Seconds"
                    title = "Easy"
                    btnLevel = "Start"
                    image={easyImage}
                    onStart={() => handleLevel('easy')}
                    
                />

                <LevelCard 
                    time = "10 Seconds"
                    title = "Medium"
                    btnLevel = "Start"
                    image={mediumImage}
                    onStart={() => handleLevel('medium')}
                />

                <LevelCard 
                    time = "8 Seconds"
                    title = "Hard"
                    btnLevel = "Start"
                    image={hardImage}
                    onStart={() => handleLevel('hard')}
                />
            </div>
            </div>
            </div>
        </>
    );
};

export default LevelSelectionPage;
