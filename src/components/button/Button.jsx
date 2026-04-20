import styles from "../../app.module.css";

export const Button = ({ children, onClick }) => {
	return (
		<button className={styles.todos__btn} onClick={onClick}>
			{children}
		</button>
	);
};
