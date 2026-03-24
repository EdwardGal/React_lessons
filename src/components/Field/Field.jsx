import styles from "./field.module.css";
import { FieldLayout } from "./FieldLayout";
import PropTypes from "prop-types";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Варианты побед по горизонтали
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Варианты побед по вертикали
  [0, 4, 8],
  [2, 4, 6], // Варианты побед по диагонали
];

export const Field = ({
  field,
  setField,
  currentPlayer,
  setCurrentPlayer,
  isGameEnded,
  setIsDraw,
  setIsGameEnded,
}) => {

  const onClickHandler = (index) => {
    if (index === undefined) return;

    if (field[index] === "" && isGameEnded === false) {
      const arr = field.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
      setField(arr);

      const hasWinner = WIN_PATTERNS.some(([a, b, c]) => {
        const mark = arr[a];
        return mark !== "" && mark === arr[b] && mark === arr[c];
      });

      if (hasWinner) {
        setIsGameEnded(true);
        return
      }

      if (!hasWinner && !arr.includes("")) {
        setIsDraw(true);
        return
      }

      setCurrentPlayer((prev) => (prev === "X" ? "0" : "X"))


    }
  };

  return (
    <div className={styles.field}>
      <FieldLayout field={field} onClickHandler={onClickHandler} />
    </div>
  );
};

Field.propTypes = {
  field: PropTypes.array,
  setField: PropTypes.func,
  currentPlayer: PropTypes.string,
  setCurrentPlayer: PropTypes.func,
  isGameEnded: PropTypes.bool,
  setIsDraw: PropTypes.func,
  setIsGameEnded: PropTypes.func,
};
