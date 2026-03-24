import styles from "./field.module.css";
import PropTypes from "prop-types";

export const FieldLayout = ({
	field,
	onClickHandler
}) => {

	return (
		<div className={styles.field__items}>
			{field.map((item, index) => (
				<button
					key={index}
					className={styles.field__item}
          type="button"
          disabled={item !== ""}
					onClick={() => onClickHandler(index)}
				>
					{item}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
  field: PropTypes.array,
  onClickHandler: PropTypes.func,
};
