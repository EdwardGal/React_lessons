import { useState } from "react";
import { GameLayout } from "./components/GameLayout/GameLayout";
import styles from "./game.module.css";



export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);


  const resetGame = () => {
    setField(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
    setIsGameEnded(false);
    setIsDraw(false);
  }


  return (
    <>
      <GameLayout
        field={field}
        setField={setField}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        isGameEnded={isGameEnded}
        setIsGameEnded={setIsGameEnded}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
      />
      <button className={styles.app__btn} type="button" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
};
