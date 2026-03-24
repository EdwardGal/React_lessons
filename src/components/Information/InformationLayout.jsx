import styles from "./information.module.css";
import PropTypes from "prop-types";

export const InformationLayout = ({
  message,
}) => {

  return <div className={styles.information__title}>{message}</div>;
};

InformationLayout.propTypes = {
  currentPlayer: PropTypes.string,
  isGameEnded: PropTypes.bool,
  isDraw: PropTypes.bool,
};
