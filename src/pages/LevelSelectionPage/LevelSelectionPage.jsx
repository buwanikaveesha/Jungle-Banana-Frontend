import React from 'react';
import { useNavigate } from 'react-router-dom';
import LionImage from '../../assets/images/cartoon-lion.png';
import easyImage from '../../assets/images/easyMonkey.png';
import hardImage from '../../assets/images/hardMonkey.png';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import mediumImage from '../../assets/images/mediumMonkey.png';
import LevelCard from '../../components/LevelCard/LevelCard';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './LevelSelectionPage.css';

const LevelSelectionPage = () => {

    const divStyle = {
        backgroundImage: `url(${ProfileBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const navigate = useNavigate();

    const handleLevel = (level) => {
        navigate(`/level/${level}`);
    }

    return (

        <div style={divStyle}>
            <>
                <h1 className="title-level-selection">CHOOSE A LEVEL</h1>
                <div>
                    <img src={LionImage} alt="Lion" className="lion-image" />

                    <SlideMenuBar /> {/* Add SlideMenuBar */}

                    <div className="level-page">
                        <div className='level-card-container'>
                            <LevelCard
                                time="60 Seconds"
                                title="Easy"
                                btnLevel="Start"
                                image={easyImage}
                                onStart={() => handleLevel('easy')}

                            />

                            <LevelCard
                                time="30 Seconds"
                                title="Medium"
                                btnLevel="Start"
                                image={mediumImage}
                                onStart={() => handleLevel('medium')}
                            />

                            <LevelCard
                                time="15 Seconds"
                                title="Hard"
                                btnLevel="Start"
                                image={hardImage}
                                onStart={() => handleLevel('hard')}
                            />
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default LevelSelectionPage;
