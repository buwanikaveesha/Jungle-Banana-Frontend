import React from 'react';
import GameBoard from '../../components/MemoryCardGame/GameBoard';
import Overlay from '../../components/MemoryCardGame/Overlay';
import SideBar from '../../components/MemoryCardGame/SideBar';
import GameContextProvider from '../../context/GameContextProvider';

const MemoryCardGame = () => {
  return (
    <GameContextProvider>
      <main className=" relative overflow-hidden bg-app-banner bg-center bg-cover h-screen w-screen flex flex-col items-center justify-center">
        <div className=" absolute bg-gradient-to-r from-[#5ec73e] to-[#5ec808] opacity-50 w-full h-full" />
        <div className=" relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0 bg-gameboard-background bg-center bg-contain bg-no-repeat w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]">
          <GameBoard />
          <SideBar />
        </div>
          <Overlay />
      </main>
    </GameContextProvider>
  );
}

export default MemoryCardGame