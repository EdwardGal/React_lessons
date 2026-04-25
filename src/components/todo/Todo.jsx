import { Link } from "react-router-dom";
import styles from "../../app.module.scss";

export const Todo = ({ id, title }) => {
	return (
		<li className={styles.todo}>
			<Link className={styles.todo__title} to={`/todo/${id}`}>
				{title}
			</Link>
		</li>
	);
};
