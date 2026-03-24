import { Information } from "../Information/Information";
import { Field } from "../Field/Field";
import PropTypes from "prop-types";

export const GameLayout = ({ currentPlayer, isGameEnded, isDraw, ...rest }) => {
  return (
    <>
      <Information
        currentPlayer={currentPlayer}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
      />
      <Field
        currentPlayer={currentPlayer}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
        {...rest}
      />
    </>
  );
};

GameLayout.propTypes = {
  field: PropTypes.array,
  setField: PropTypes.func,
  currentPlayer: PropTypes.string,
  setCurrentPlayer: PropTypes.func,
  isGameEnded: PropTypes.bool,
  setIsGameEnded: PropTypes.func,
  isDraw: PropTypes.bool,
  setIsDraw: PropTypes.func,
};
