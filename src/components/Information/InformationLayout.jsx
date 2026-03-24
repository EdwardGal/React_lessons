import styles from "./information.module.css";
import PropTypes from "prop-types";

export const InformationLayout = ({
	currentPlayer,
	isGameEnded,
	isDraw,
}) => {
	let status;

	if (isDraw) {
		status = "Ничья";
	} else if (isGameEnded) {
		status = `Победа: ${currentPlayer}`;
	} else {
		status = `Ходит: ${currentPlayer}`;
	}

	return <div className={styles.information__title}>{status}</div>;
};

InformationLayout.propTypes = {
  currentPlayer: PropTypes.string,
  isGameEnded: PropTypes.bool,
  isDraw: PropTypes.bool,
};
