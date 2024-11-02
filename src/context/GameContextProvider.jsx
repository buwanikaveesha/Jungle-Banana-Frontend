import React, { createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import fruit images
import apple from "../assets/images/fruits/apple.png";
import dragonfruit from "../assets/images/fruits/dragonfruit.png";
import durian from "../assets/images/fruits/durian.png";
import mangosteen from "../assets/images/fruits/mangosteen.png";
import passionfruit from "../assets/images/fruits/passionfruit.png";
import pineapple from "../assets/images/fruits/pineapple.png";
import starfruit from "../assets/images/fruits/starfruit.png";
import watermelon from "../assets/images/fruits/watermelon.png";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showIcons, setShowIcons] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const timerRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fruitIcons = [
      apple,
      dragonfruit,
      durian,
      mangosteen,
      passionfruit,
      pineapple,
      starfruit,
      watermelon,
    ];
    const pairIcons = [...fruitIcons, ...fruitIcons];
    const shuffledIcons = pairIcons.sort(() => Math.random() - 0.5);

    const cardItems = shuffledIcons.map((fruit, index) => ({
      id: index,
      fruit,
      flipped: false,
    }));

    setCards(cardItems);

    setTimeout(() => {
      setShowIcons(false);
    }, 3000);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!gameWon) setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameWon]);

  const flipCard = (index) => {
    if (flippedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);

    setFlippedCards((prevFlippedCards) => {
      const newFlippedCards = [...prevFlippedCards, index];

      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;

        if (updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit) {
          const newMatchedPairs = [...matchedPairs, updatedCards[firstIndex].fruit];
          setMatchedPairs(newMatchedPairs);

          if (newMatchedPairs.length === cards.length / 2) {
            clearInterval(timerRef.current);
            setTimeout(() => {
              setGameWon(true);
            }, 1000);
            setScore(timeLeft * 10);
          }
        } else {
          setTimeout(() => {
            const resetCards = [...updatedCards];
            resetCards[firstIndex].flipped = false;
            resetCards[secondIndex].flipped = false;
            setCards(resetCards);
          }, 1000);
        }
        return [];
      }
      return newFlippedCards;
    });
  };

  const restartGame = () => {
    window.location.reload();
  };

  // Function to quit the game and navigate to /miniGames
  const quitGame = () => {
    navigate('/miniGames');
  };

  return (
    <GameContext.Provider
      value={{
        cards,
        flipCard,
        matchedPairs,
        showIcons,
        timeLeft,
        gameOver,
        gameWon,
        restartGame,
        quitGame, 
        score,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
