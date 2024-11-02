import React, { useContext } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import QuitBtn from "../../assets/images/logout.png";
import RestartBtn from "../../assets/images/restart-btn.png";
import Score from "../../assets/images/score.png";
import { GameContext } from "../../context/GameContextProvider";

const Overlay = () => {
  const { gameOver, gameWon, restartGame, score } = useContext(GameContext);
  const navigate = useNavigate();

  if (!gameOver && !gameWon) return null;

  const handleQuit = () => {
    navigate("/miniGames"); 
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50 rounded-xl">
      <h1 className="text-orange-300 text-5xl md:text-8xl font-serif font-bold mb-8">
        {gameOver ? " Game Over 😥 " : gameWon ? " You Win 🎉 " : ""}
      </h1>
      <div className="flex items-center gap-3 mt-10">
        <img src={Score} alt="score" className="w-10 h-10" />
        <p className="text-4xl uppercase font-bold text-white">
          Your Score : <span className="text-green-500 text-5xl">{score}</span>
        </p>
      </div>

      <div className="mt-10 flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className="flex items-center gap-3">
          <img src={RestartBtn} alt="Restart" className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-amber-900 md:text-lg font-bold">Replay</p>
        </button>

        {/* Quit Button */}
        <button onClick={handleQuit} className="flex items-center gap-3">
          <img src={QuitBtn} alt="Quit" className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-amber-900 md:text-lg font-bold">Quit</p>
        </button>
      </div>

      {gameWon && (
        <Confetti
          width={2000}
          height={1000}
          tweenDuration={5000}
          numberOfPieces={200}
          gravity={0.01}
          colors={["#f44336", "#00ff00", "#0000ff", "#ffff00", "#9c27b0"]}
        />
      )}
    </div>
  );
};

export default Overlay;
