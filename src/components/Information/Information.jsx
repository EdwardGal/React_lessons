import styles from "./information.module.css";
import { InformationLayout } from "./InformationLayout";
import PropTypes from "prop-types";

export const Information = (props) => {
	return (
		<div className={styles.information}>
			<InformationLayout {...props} />
		</div>
	);
};

Information.propTypes = {
  currentPlayer: PropTypes.string,
  isGameEnded: PropTypes.bool,
  isDraw: PropTypes.bool,
};
