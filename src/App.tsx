import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colours } from "./models/Colours";
import LostFiguresComponent from "./components/LostFiguresComponent";
import TimerComponent from "./components/TimerComponent";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colours.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colours.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function changePlayer() {
    setCurrentPlayer(
      currentPlayer?.colour === Colours.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="app">
      <TimerComponent currentPlayer={currentPlayer} restart={restart}/>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
      <div>
        <LostFiguresComponent
          title="Lost black figures"
          figures={board.lostBlackFigures}
        />
        <LostFiguresComponent
          title="Lost white figures"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
